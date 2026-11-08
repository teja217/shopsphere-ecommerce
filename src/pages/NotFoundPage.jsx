import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, ShoppingBag } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest border border-indigo-100">
        404 • Page Not Found
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
        Lost in the Sphere?
      </h1>

      <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
        The page you requested might have been moved, renamed, or is temporarily unavailable. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" /> Go to Homepage
        </Link>

        <Link
          to="/products"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> Browse Catalog
        </Link>
      </div>
    </div>
  );
};
