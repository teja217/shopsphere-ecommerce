import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { formatCurrency, getDiscountBadge } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { QuickViewModal } from './QuickViewModal';

export const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const { addToCart } = useCart();

  const discountBadge = getDiscountBadge(product.price, product.originalPrice, product.discountPercentage);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;
    addToCart(product, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  if (viewMode === 'list') {
    return (
      <>
        <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-card-hover transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-stretch relative">
          {/* Image */}
          <Link
            to={`/products/${product.id}`}
            className="w-full sm:w-48 sm:h-48 aspect-square rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative"
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {discountBadge && (
              <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                {discountBadge}
              </span>
            )}
          </Link>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                  {product.categoryName || product.category}
                </span>
                {product.isBestSeller && (
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Best Seller
                  </span>
                )}
                {product.isNewArrival && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    New
                  </span>
                )}
              </div>

              <Link
                to={`/products/${product.id}`}
                className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2"
              >
                {product.name}
              </Link>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="ml-1 text-sm font-semibold text-slate-800">{product.rating}</span>
                </div>
                <span className="text-xs text-slate-400">({product.reviewsCount} reviews)</span>
                <span className="text-slate-300">•</span>
                <span className={`text-xs font-medium ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </span>
              </div>

              <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                {product.shortDescription || product.description}
              </p>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickView}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                    isAddedRecently
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:shadow-indigo-600/30'
                  } disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed`}
                >
                  {isAddedRecently ? (
                    <>
                      <Check className="w-4 h-4" /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      </>
    );
  }

  // Grid view (default)
  return (
    <>
      <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-card-hover transition-all duration-300 flex flex-col h-full overflow-hidden relative">
        {/* Image Container */}
        <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
          <Link to={`/products/${product.id}`} className="block w-full h-full">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start pointer-events-none">
            {discountBadge && (
              <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                {discountBadge}
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                Best Seller
              </span>
            )}
          </div>

          {/* Hover Quick Action */}
          <div className="absolute inset-x-0 bottom-3 px-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleQuickView}
              className="w-full py-2 bg-white/95 backdrop-blur-md text-slate-800 hover:text-indigo-600 rounded-xl text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="font-semibold text-indigo-600 uppercase tracking-wider text-[11px]">
                {product.categoryName || product.category}
              </span>
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="ml-1 font-semibold text-slate-700">{product.rating}</span>
                <span className="ml-0.5 text-slate-400 text-[10px]">({product.reviewsCount})</span>
              </div>
            </div>

            <Link
              to={`/products/${product.id}`}
              className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 text-base leading-snug mb-1.5"
            >
              {product.name}
            </Link>

            <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
              {product.shortDescription || product.description}
            </p>
          </div>

          {/* Price & Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-slate-900 leading-tight">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`p-2.5 rounded-xl font-semibold text-xs transition-all shadow-sm flex items-center justify-center ${
                isAddedRecently
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:shadow-indigo-600/30'
              } disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed`}
              title="Add to Cart"
              aria-label={`Add ${product.name} to cart`}
            >
              {isAddedRecently ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};
