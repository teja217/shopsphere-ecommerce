import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Target,
  Eye,
  CheckCircle2,
  Award,
  Users,
  Globe2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Leaf,
} from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wider uppercase border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Our Origin & Purpose
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Architecting the Future of <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-violet-300">
              Modern Digital Retail
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            ShopSphere was founded with a singular conviction: online shopping should be intuitive,
            transparent, lightning-fast, and thoughtfully curated for intentional living.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl">
          <div className="text-center space-y-1 border-r border-slate-100 last:border-none">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">120K+</div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Happy Customers
            </div>
          </div>
          <div className="text-center space-y-1 border-r border-slate-100 last:border-none">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">10K+</div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Verified Products
            </div>
          </div>
          <div className="text-center space-y-1 border-r border-slate-100 last:border-none">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">99.8%</div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              On-Time Dispatch
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">4.9 ★</div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              TrustScore Rating
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Our Mission</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To empower modern individuals and creators with thoroughly tested, durable, and
              aesthetically refined lifestyle products. We eliminate catalog clutter by hand-selecting
              only items that meet rigorous standards for utility, craftsmanship, and longevity.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Our Vision</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be the benchmark for consumer trust in global e-commerce. Through continuous
              architectural innovation, real-time logistics transparency, and carbon-conscious
              packaging, we build lasting partnerships with both makers and customers.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars of ShopSphere */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Why ShopSphere
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            The Pillars of Our Experience
          </h2>
          <p className="text-sm text-slate-500">
            Engineered from database schema to user interface for sheer reliability and satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Zero-Compromise Authenticity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every single product listed in our catalog is sourced directly from certified original
              equipment manufacturers and comes backed by full manufacturer warranties.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Smart Express Logistics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated fulfillment hubs route your orders through optimal regional distribution
              points, cutting transit times and reducing carbon footprint.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Eco-Conscious Packaging</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We utilize 100% biodegradable corrugated cardboard and water-soluble tape, minimizing
              plastic waste across every package delivered to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl font-extrabold">Ready to Upgrade Your Workspace & Style?</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Explore our curated catalog of electronics, smart gear, fitness equipment, and apparel.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
