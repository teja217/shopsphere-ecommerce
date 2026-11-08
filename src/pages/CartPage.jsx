import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
  Tag,
  Truck,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import { CheckoutModal } from '../components/CheckoutModal';

export const CartPage = () => {
  const {
    cartItems,
    summary,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  // Free shipping progress calculation ($50 threshold)
  const freeShippingThreshold = 50;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - summary.subtotal);
  const freeShippingPercent = Math.min(100, Math.round((summary.subtotal / freeShippingThreshold) * 100));

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Cart is Empty</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our curated collections of
            electronics, wearables, apparel, and smart home gear.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title & Item Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-slate-500 mt-1">
            You have <strong className="text-slate-800">{summary.totalItems}</strong> item
            {summary.totalItems === 1 ? '' : 's'} in your cart
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 self-start sm:self-auto flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2 text-slate-700">
            <Truck className="w-4 h-4 text-indigo-600" />
            {amountToFreeShipping === 0 ? (
              <span className="text-emerald-600 font-bold">
                🎉 Congratulations! You unlocked Free Standard Shipping!
              </span>
            ) : (
              <span>
                Add <strong className="text-indigo-600 font-bold">{formatCurrency(amountToFreeShipping)}</strong> more to unlock Free Shipping
              </span>
            )}
          </div>
          <span className="text-slate-400">{freeShippingPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${freeShippingPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Layout (Items List + Order Summary) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs divide-y divide-slate-100">
          {cartItems.map((item) => (
            <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Product Thumbnail */}
              <Link
                to={`/products/${item.product.id}`}
                className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0"
              >
                <img
                  src={item.product.images?.[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </Link>

              {/* Title & Price */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                  {item.product.categoryName || item.product.category}
                </span>
                <Link
                  to={`/products/${item.product.id}`}
                  className="block text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors truncate"
                >
                  {item.product.name}
                </Link>
                <div className="text-sm font-semibold text-slate-500 mt-1">
                  Unit Price: {formatCurrency(item.product.price)}
                </div>
              </div>

              {/* Quantity Modifier */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 text-slate-600 hover:bg-slate-200 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 text-slate-600 hover:bg-slate-200 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Line Item Total */}
              <div className="text-right min-w-[80px]">
                <div className="text-base font-extrabold text-slate-900">
                  {formatCurrency(item.product.price * item.quantity)}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Continue Shopping Link */}
          <div className="p-4 sm:p-6 bg-slate-50/50 flex items-center justify-between">
            <Link
              to="/products"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h2>

          {/* Pricing Breakdown */}
          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal ({summary.totalItems} items)</span>
              <span className="font-semibold text-slate-900">{formatCurrency(summary.subtotal)}</span>
            </div>

            {summary.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount ({summary.couponCode})</span>
                <span>-{formatCurrency(summary.discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-slate-900">
                {summary.shipping === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  formatCurrency(summary.shipping)
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span className="font-semibold text-slate-900">{formatCurrency(summary.tax)}</span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
              <span>Total</span>
              <span className="text-xl text-indigo-600">{formatCurrency(summary.total)}</span>
            </div>
          </div>

          {/* Promo Code Input */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Have a Promo Code?
            </label>
            {summary.couponCode ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <div>
                  <span className="font-bold text-emerald-800">{summary.couponCode}</span>
                  <p className="text-[11px] text-emerald-600">{summary.couponDescription}</p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-slate-400 hover:text-rose-600"
                  title="Remove coupon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SHOPSPHERE10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 font-mono uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            <p className="text-[10px] text-slate-400 mt-1.5">
              Try test codes: <strong className="text-slate-600">SHOPSPHERE10</strong> (10% off) or{' '}
              <strong className="text-slate-600">WELCOME20</strong> (20% off)
            </p>
          </div>

          {/* Checkout CTA Button */}
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Security & Guarantees */}
          <div className="space-y-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure 256-bit SSL Encrypted Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>Free returns within 30 days of delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal Dialog */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
};
