import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartService } from '../services/cartService';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

const VALID_COUPONS = {
  SHOPSPHERE10: { code: 'SHOPSPHERE10', rate: 0.1, description: '10% Discount on Subtotal' },
  WELCOME20: { code: 'WELCOME20', rate: 0.2, description: '20% Welcome Offer' },
  FREESHIP: { code: 'FREESHIP', rate: 0, freeShipping: true, description: 'Free Standard Shipping' },
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addToast } = useToast();

  // Save cart to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Save coupon to local storage
  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem('shopsphere_coupon', JSON.stringify(coupon));
      } else {
        localStorage.removeItem('shopsphere_coupon');
      }
    } catch (e) {
      console.warn('Failed to save coupon', e);
    }
  }, [coupon]);

  // Initial fetch from backend if available
  useEffect(() => {
    const fetchRemoteCart = async () => {
      try {
        const remote = await cartService.getCart();
        if (remote && remote.items && remote.items.length > 0) {
          setCartItems(remote.items);
        }
      } catch (err) {
        // Backend might be offline or starting up, silent fallback to local cart
      }
    };
    fetchRemoteCart();
  }, []);

  // Compute live cart summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  let discountAmount = 0;
  let isFreeShipping = coupon?.freeShipping || false;

  if (coupon && coupon.rate > 0) {
    discountAmount = Math.round(subtotal * coupon.rate * 100) / 100;
  }

  const shipping = subtotal === 0 || subtotal >= 50 || isFreeShipping ? 0 : 9.99;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(taxableAmount * 0.08 * 100) / 100; // 8% sales tax
  const total = Math.max(0, Math.round((subtotal - discountAmount + shipping + tax) * 100) / 100);

  const summary = {
    totalItems,
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount,
    couponCode: coupon?.code || null,
    couponDescription: coupon?.description || null,
    shipping,
    tax,
    total,
  };

  // Add Item to Cart
  const addToCart = useCallback(
    async (product, quantity = 1) => {
      const qty = Math.max(1, parseInt(quantity, 10) || 1);

      // Optimistic state update
      setCartItems((prev) => {
        const index = prev.findIndex((item) => item.product.id === product.id);
        if (index > -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            quantity: updated[index].quantity + qty,
          };
          return updated;
        } else {
          return [
            ...prev,
            {
              id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
              product: {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                originalPrice: product.originalPrice,
                images: product.images,
                category: product.category,
                categoryName: product.categoryName,
                stock: product.stock,
              },
              quantity: qty,
            },
          ];
        }
      });

      addToast(`Added "${product.name}" to your cart!`, 'success');

      // Async backend sync
      try {
        await cartService.addToCart(product.id, qty);
      } catch (err) {
        // Backend sync error silently ignored since local cart is already active
      }
    },
    [addToast]
  );

  // Update item quantity
  const updateQuantity = useCallback(
    async (itemId, newQuantity) => {
      const qty = parseInt(newQuantity, 10);

      setCartItems((prev) => {
        if (qty <= 0) {
          return prev.filter((item) => item.id !== itemId && item.product.id !== itemId);
        }
        return prev.map((item) =>
          item.id === itemId || item.product.id === itemId ? { ...item, quantity: qty } : item
        );
      });

      try {
        await cartService.updateQuantity(itemId, qty);
      } catch (err) {
        // Silently handled
      }
    },
    []
  );

  // Remove item
  const removeFromCart = useCallback(
    async (itemId) => {
      const itemToRemove = cartItems.find(
        (item) => item.id === itemId || item.product.id === itemId
      );

      setCartItems((prev) =>
        prev.filter((item) => item.id !== itemId && item.product.id !== itemId)
      );

      if (itemToRemove) {
        addToast(`Removed "${itemToRemove.product.name}" from cart`, 'info');
      }

      try {
        await cartService.removeItem(itemId);
      } catch (err) {
        // Handled
      }
    },
    [cartItems, addToast]
  );

  // Clear cart
  const clearCart = useCallback(async () => {
    setCartItems([]);
    setCoupon(null);
    try {
      await cartService.clearCart();
    } catch (err) {
      // Handled
    }
  }, []);

  // Apply Coupon
  const applyCoupon = useCallback(
    (code) => {
      if (!code || !code.trim()) return false;
      const cleanCode = code.trim().toUpperCase();
      const foundCoupon = VALID_COUPONS[cleanCode];

      if (foundCoupon) {
        setCoupon(foundCoupon);
        addToast(`Promo code "${cleanCode}" applied: ${foundCoupon.description}`, 'success');
        return true;
      } else {
        addToast(`Promo code "${cleanCode}" is invalid or expired`, 'error');
        return false;
      }
    },
    [addToast]
  );

  // Remove Coupon
  const removeCoupon = useCallback(() => {
    setCoupon(null);
    addToast('Promo code removed', 'info');
  }, [addToast]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        summary,
        loading,
        coupon,
        isDrawerOpen,
        setIsDrawerOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
