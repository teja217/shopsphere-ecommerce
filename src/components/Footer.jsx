import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Mail,
  Truck,
  ShieldCheck,
  Headphones,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    addToast('Welcome to ShopSphere VIP! Check your inbox for exclusive perks.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Trust Factors Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
              <p className="text-xs text-slate-400">On all domestic orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Authentic Guarantee</h4>
              <p className="text-xs text-slate-400">100% verified original gear</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Day Hassle Returns</h4>
              <p className="text-xs text-slate-400">Instant label & zero penalty</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Concierge Support</h4>
              <p className="text-xs text-slate-400">Live human help whenever needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Shop<span className="text-indigo-400">Sphere</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Curating premium electronics, modern urban apparel, and smart home innovations with
              uncompromising craftsmanship and lightning-fast delivery.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                Subscribe for Member Perks & Exclusive Deals
              </span>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>You're subscribed! Enjoy 10% off with promo SHOPSPHERE10</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/products?category=electronics" className="hover:text-white transition-colors">
                  Electronics & Laptops
                </Link>
              </li>
              <li>
                <Link to="/products?category=audio-wearables" className="hover:text-white transition-colors">
                  Audio & Wearables
                </Link>
              </li>
              <li>
                <Link to="/products?category=fashion-apparel" className="hover:text-white transition-colors">
                  Fashion & Urban Apparel
                </Link>
              </li>
              <li>
                <Link to="/products?category=smart-home" className="hover:text-white transition-colors">
                  Smart Home & Lighting
                </Link>
              </li>
              <li>
                <Link to="/products?category=fitness-outdoors" className="hover:text-white transition-colors">
                  Fitness & Outdoors
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Help Center & Contact
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Shipping Rates & Timelines
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Warranty Coverage
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About ShopSphere
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Catalog Explorer
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Sustainability Mission
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Press & Partnerships
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ShopSphere Inc. Built with React, Node.js & Tailwind CSS.</p>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-slate-400">Guaranteed Safe Checkout:</span>
            <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
              <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">VISA</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Mastercard</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Amex</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Apple Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
