import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
  Calendar,
  Smartphone,
  Banknote,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import { contactService } from '../services/contactService';

export const CheckoutModal = ({ isOpen, onClose }) => {
  const { cartItems, summary, clearCart } = useCart();

  const [step, setStep] = useState(1); // 1: Shipping & Payment, 2: Order Placed Confirmation
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Form State
  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 019-2834',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zipCode: '97477',
    country: 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState('standard'); // standard | express
  const [paymentMethod, setPaymentMethod] = useState('card'); // card | upi | cod

  const [cardInfo, setCardInfo] = useState({
    number: '4242 •••• •••• 4242',
    name: 'ALEX VANCE',
    expiry: '12/28',
    cvv: '•••',
  });

  if (!isOpen) return null;

  const shippingFee = shippingMethod === 'express' ? 14.99 : summary.shipping;
  const finalTotal = Math.round((summary.total + (shippingMethod === 'express' ? 14.99 : 0)) * 100) / 100;

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderPayload = {
        shippingAddress: shippingInfo,
        shippingMethod,
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card'
            : paymentMethod === 'upi'
            ? 'UPI / Digital Wallet'
            : 'Cash on Delivery',
        items: cartItems,
        summary: {
          ...summary,
          shipping: shippingFee,
          total: finalTotal,
        },
      };

      const res = await contactService.processCheckout(orderPayload);
      const orderData = res || {
        orderId: `ORD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`,
        placedAt: new Date().toISOString(),
        shippingAddress: shippingInfo,
        items: cartItems,
        summary: { total: finalTotal },
        status: 'Confirmed',
        estimatedDelivery: '3-5 Business Days',
      };

      setCompletedOrder(orderData);
      setStep(2);
      clearCart();

      // Launch Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#7C3AED', '#10B981', '#F59E0B'],
        });
      } catch (e) {
        // Confetti fallback
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto border border-slate-100">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Secure Checkout</h2>
                <p className="text-xs text-slate-500">256-bit SSL encrypted • Safe & guaranteed</p>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Shipping Address */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-600" /> 1. Shipping Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={shippingInfo.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ZIP</label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  2. Delivery Option
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <span className="block text-sm font-semibold text-slate-900">
                          Standard Delivery
                        </span>
                        <span className="block text-xs text-slate-500">3-5 Business Days</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-900">
                      {summary.shipping === 0 ? 'FREE' : formatCurrency(summary.shipping)}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <span className="block text-sm font-semibold text-slate-900">
                          Express Air Priority
                        </span>
                        <span className="block text-xs text-slate-500">1-2 Business Days</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-900">$14.99</span>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-indigo-600" /> 3. Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-2.5 mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-semibold ${
                      paymentMethod === 'card'
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 ring-2 ring-indigo-100'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    Credit Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-semibold ${
                      paymentMethod === 'upi'
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 ring-2 ring-indigo-100'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    UPI / Wallet
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-semibold ${
                      paymentMethod === 'cod'
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 ring-2 ring-indigo-100'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Banknote className="w-5 h-5" />
                    Cash on Delivery
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Card Number (Test simulated)
                      </label>
                      <input
                        type="text"
                        value={cardInfo.number}
                        readOnly
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardInfo.expiry}
                          readOnly
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">CVV</label>
                        <input
                          type="text"
                          value={cardInfo.cvv}
                          readOnly
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Final Summary */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-base font-bold text-slate-900 mb-4">
                  <span>Total Amount Due:</span>
                  <span className="text-2xl text-indigo-600">{formatCurrency(finalTotal)}</span>
                </div>

                <button
                  type="submit"
                  disabled={loading || cartItems.length === 0}
                  className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all flex items-center justify-center gap-2 text-base"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing & Placing Order...</span>
                    </div>
                  ) : (
                    <>
                      <span>Complete Order & Pay {formatCurrency(finalTotal)}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Step 2: Order Placed Success Confirmation */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Payment & Order Confirmed
            </span>

            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 mb-2">
              Thank You for Your Order!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
              Your order has been recorded and is being prepared for dispatch. A confirmation email
              with tracking information has been sent to{' '}
              <strong className="text-slate-900">{shippingInfo.email}</strong>.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-lg mx-auto mb-6 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Order Number
                </span>
                <span className="text-sm font-mono font-bold text-indigo-600">
                  {completedOrder?.orderId}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Estimated Delivery</span>
                <span className="font-semibold text-slate-800">
                  {completedOrder?.estimatedDelivery || '3-5 Business Days'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Shipping Destination</span>
                <span className="font-semibold text-slate-800">
                  {shippingInfo.city}, {shippingInfo.state}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                <span>Paid via {completedOrder?.paymentMethod || 'Credit Card'}</span>
                <span className="text-indigo-600 text-base">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all text-sm"
            >
              Continue Exploring ShopSphere
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
