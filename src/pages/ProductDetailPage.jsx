import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Heart,
  Share2,
  ChevronRight,
  ArrowLeft,
  Package,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, getDiscountBadge, calculateSavings } from '../utils/formatters';
import { ProductCard } from '../components/ProductCard';
import { CheckoutModal } from '../components/CheckoutModal';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'shipping' | 'reviews'
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Reviews state with real user review submission
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Marcus K.',
      rating: 5,
      date: '2 days ago',
      title: 'Phenomenal build quality and sound',
      comment: 'Exceeded all expectations. Setup took less than two minutes and the materials feel exceptionally premium. Highly recommend!',
      verified: true,
    },
    {
      id: 2,
      author: 'Elena R.',
      rating: 5,
      date: '1 week ago',
      title: 'Best purchase of the year',
      comment: 'Flawless design, sleek ergonomics, and lightning-fast shipping. Arrived two days earlier than projected.',
      verified: true,
    },
    {
      id: 3,
      author: 'David L.',
      rating: 4,
      date: '2 weeks ago',
      title: 'Great value for money',
      comment: 'Very solid performance. Minor learning curve on settings but once configured it works like a charm.',
      verified: true,
    },
  ]);

  const [newReview, setNewReview] = useState({ author: '', rating: 5, comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        if (data) {
          setProduct(data);
          setSelectedImageIndex(0);
          setQuantity(1);

          // Fetch related products in the same category
          if (data.category) {
            const related = await productService.getProductsByCategory(data.category);
            setRelatedProducts(related.filter((p) => p.id !== data.id).slice(0, 4));
          }
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-slate-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-6 bg-slate-200 rounded w-1/4" />
            <div className="h-10 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="h-24 bg-slate-200 rounded w-full" />
            <div className="h-12 bg-slate-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <p className="text-slate-500 text-sm">
          The product you are looking for does not exist or may have been unlisted.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-indigo-700 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const discountBadge = getDiscountBadge(product.price, product.originalPrice, product.discountPercentage);
  const savings = calculateSavings(product.price, product.originalPrice);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.comment.trim()) {
      addToast('Please provide your name and review details', 'error');
      return;
    }
    setIsSubmittingReview(true);
    setTimeout(() => {
      setReviews([
        {
          id: Date.now(),
          author: newReview.author.trim(),
          rating: Number(newReview.rating),
          date: 'Just now',
          title: 'Verified Customer Review',
          comment: newReview.comment.trim(),
          verified: true,
        },
        ...reviews,
      ]);
      setNewReview({ author: '', rating: 5, comment: '' });
      setIsSubmittingReview(false);
      addToast('Thank you! Your review has been published.', 'success');
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/products" className="hover:text-indigo-600 transition-colors">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          to={`/products?category=${product.category}`}
          className="hover:text-indigo-600 transition-colors capitalize"
        >
          {product.categoryName || product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Product Images Gallery (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Large Display Image */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-card">
            <img
              src={product.images?.[selectedImageIndex] || product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {discountBadge && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {discountBadge}
              </span>
            )}
            {product.isBestSeller && (
              <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Best Seller
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 bg-white flex-shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-indigo-600 ring-4 ring-indigo-100'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Buy Box & Product Info (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                {product.categoryName || product.category}
              </span>
              <span className="text-xs font-mono text-slate-400">SKU: {product.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Ratings Bar */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewsCount} verified reviews)</span>
            </div>

            {/* Pricing Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-slate-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                {savings > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Save {formatCurrency(savings)}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Taxes calculated at checkout • Eligible for Free Shipping
              </p>
            </div>

            {/* Short Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {/* Stock Availability Indicator */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  product.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
              <span className="text-xs font-semibold text-slate-700">
                {product.stock > 0
                  ? `In Stock • Ready to dispatch (${product.stock} units available)`
                  : 'Currently Out of Stock'}
              </span>
            </div>
          </div>

          {/* Purchasing Actions */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Quantity:
              </span>
              <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 transition-colors font-bold text-sm"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 font-bold text-slate-800 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 transition-colors font-bold text-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 text-amber-400" />
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
              <div className="flex flex-col items-center gap-1 text-[11px] text-slate-600">
                <Truck className="w-4 h-4 text-indigo-600" />
                <span>Free Express Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[11px] text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[11px] text-slate-600">
                <RotateCcw className="w-4 h-4 text-amber-600" />
                <span>30-Day Money Back</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        {/* Tab Headers */}
        <div className="flex items-center gap-4 border-b border-slate-200 pb-4 overflow-x-auto">
          {[
            { id: 'overview', label: 'Detailed Overview' },
            { id: 'specs', label: 'Specifications' },
            { id: 'shipping', label: 'Shipping & Returns' },
            { id: 'reviews', label: `Customer Reviews (${reviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pt-6">
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-4xl text-slate-700 text-sm leading-relaxed">
              <p className="text-base">{product.description}</p>

              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-3">Key Features & Highlights</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <h3 className="text-base font-bold text-slate-900 mb-4">Technical Specifications</h3>
              {product.specifications ? (
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex px-4 py-3 text-xs">
                      <span className="w-1/3 font-semibold text-slate-500">{key}</span>
                      <span className="w-2/3 font-medium text-slate-800">{val}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">Specifications standard to manufacturer guidelines.</p>
              )}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="max-w-3xl space-y-4 text-xs text-slate-600 leading-relaxed">
              <h3 className="text-base font-bold text-slate-900">Delivery & Return Policies</h3>
              <p>
                <strong>Domestic Shipping:</strong> Orders are dispatched within 24 hours on business days. Standard delivery takes 3-5 business days. Express shipping takes 1-2 business days.
              </p>
              <p>
                <strong>Free Shipping Eligibility:</strong> All orders with a subtotal exceeding $50 automatically qualify for complimentary standard shipping within the United States.
              </p>
              <p>
                <strong>30-Day Guarantee:</strong> If you are not completely satisfied with your purchase, return the item within 30 days in its original packaging for a full refund or exchange.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-3xl">
              {/* Write a Review Box */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Share Your Experience</h4>
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={newReview.author}
                      onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                      required
                      className="px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 bg-white"
                    />
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                      className="px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 bg-white"
                    >
                      <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                      <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                      <option value="3">★★★☆☆ (3 Stars - Average)</option>
                      <option value="2">★★☆☆☆ (2 Stars - Below Average)</option>
                      <option value="1">★☆☆☆☆ (1 Star - Poor)</option>
                    </select>
                  </div>
                  <textarea
                    rows="3"
                    placeholder="Write your review here..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 bg-white"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    {isSubmittingReview ? 'Posting...' : 'Submit Review'}
                  </button>
                </form>
              </div>

              {/* Review Items List */}
              <div className="space-y-4 divide-y divide-slate-100">
                {reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Related Products in this Category
            </h2>
            <Link
              to={`/products?category=${product.category}`}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              See All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
};
