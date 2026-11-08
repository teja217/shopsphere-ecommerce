import { isMongoConnected } from '../config/db.js';
import { Cart } from '../models/Cart.js';
import { fallbackStore } from './fallbackStore.js';
import { productService } from './productService.js';

const calculateSummary = (items) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    totalItems,
    subtotal: Math.round(subtotal * 100) / 100,
    shipping,
    tax,
    total,
  };
};

export const cartService = {
  async getCart(sessionId = 'default-session') {
    if (!isMongoConnected()) {
      return fallbackStore.getCart();
    }

    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = await Cart.create({ sessionId, items: [] });
    }

    return {
      items: cart.items,
      summary: calculateSummary(cart.items),
    };
  },

  async addToCart(productId, quantity = 1, sessionId = 'default-session') {
    if (!isMongoConnected()) {
      return fallbackStore.addToCart(productId, quantity);
    }

    const product = await productService.getProductById(productId);
    if (!product) {
      throw new Error(`Product ${productId} not found`);
    }

    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }

    const existingIndex = cart.items.findIndex(item => item.product.id === product.id);
    const qty = parseInt(quantity, 10) || 1;

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += qty;
    } else {
      cart.items.push({
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.originalPrice,
          images: product.images,
          category: product.category,
          stock: product.stock,
        },
        quantity: qty,
      });
    }

    await cart.save();
    return {
      items: cart.items,
      summary: calculateSummary(cart.items),
    };
  },

  async updateCartItem(itemId, quantity, sessionId = 'default-session') {
    if (!isMongoConnected()) {
      return fallbackStore.updateCartItem(itemId, quantity);
    }

    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      throw new Error('Cart not found');
    }

    const qty = parseInt(quantity, 10);
    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === itemId || item.product.id === itemId
    );

    if (itemIndex === -1) {
      throw new Error(`Cart item ${itemId} not found`);
    }

    if (qty <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = qty;
    }

    await cart.save();
    return {
      items: cart.items,
      summary: calculateSummary(cart.items),
    };
  },

  async removeFromCart(itemId, sessionId = 'default-session') {
    if (!isMongoConnected()) {
      return fallbackStore.removeFromCart(itemId);
    }

    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.items = cart.items.filter(
      item => item._id.toString() !== itemId && item.product.id !== itemId
    );

    await cart.save();
    return {
      items: cart.items,
      summary: calculateSummary(cart.items),
    };
  },

  async clearCart(sessionId = 'default-session') {
    if (!isMongoConnected()) {
      return fallbackStore.clearCart();
    }

    let cart = await Cart.findOne({ sessionId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    return {
      items: [],
      summary: calculateSummary([]),
    };
  },
};
