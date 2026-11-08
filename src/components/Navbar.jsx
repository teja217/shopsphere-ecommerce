import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Laptop,
  Headphones,
  Shirt,
  Home as HomeIcon,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useDebounce } from '../hooks/useDebounce';
import { productService } from '../services/productService';
import { formatCurrency } from '../utils/formatters';

const CATEGORIES = [
  { id: 'electronics', name: 'Electronics & Gadgets', icon: Laptop },
  { id: 'audio-wearables', name: 'Audio & Wearables', icon: Headphones },
  { id: 'fashion-apparel', name: 'Fashion & Apparel', icon: Shirt },
  { id: 'smart-home', name: 'Smart Home & Living', icon: HomeIcon },
  { id: 'fitness-outdoors', name: 'Fitness & Outdoors', icon: Activity },
];

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const { summary } = useCart();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const debouncedSearch = useDebounce(searchTerm, 250);

  // Debounced search query
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearch.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      try {
        const results = await productService.searchProducts(debouncedSearch.trim());
        setSearchResults(results.slice(0, 5));
      } catch (err) {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };
    fetchResults();
  }, [debouncedSearch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSearchDropdown(false);
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSelectResult = (productId) => {
    setShowSearchDropdown(false);
    setSearchTerm('');
    navigate(`/products/${productId}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Promotional Top Bar */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>
          Spring Launch Special: Use code <strong className="font-bold underline tracking-wider">SHOPSPHERE10</strong> for 10% off • Free Express Shipping over $50
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform duration-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Shop<span className="text-indigo-600">Sphere</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold -mt-1">
                Premier Catalog
              </span>
            </div>
          </Link>

          {/* Search Bar with Live Dropdown (Desktop & Tablet) */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-lg relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search laptops, headphones, apparel, smart gear..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full bg-slate-100 hover:bg-slate-150 focus:bg-white text-slate-900 placeholder-slate-600 text-sm rounded-full pl-11 pr-10 py-2.5 border border-transparent focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSearchResults([]);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Instant Search Results Dropdown */}
            {showSearchDropdown && searchTerm.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-dropdown border border-slate-200 overflow-hidden z-50 animate-fade-in">
                {isSearching ? (
                  <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    Searching catalog...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="py-2 divide-y divide-slate-100">
                    <div className="px-4 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Matching Products
                    </div>
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSelectResult(product.id)}
                        className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left group"
                      >
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-indigo-600">
                            {product.name}
                          </p>
                          <p className="text-xs text-slate-500">{product.categoryName}</p>
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {formatCurrency(product.price)}
                        </span>
                      </button>
                    ))}
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full px-4 py-2.5 text-center text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1.5"
                    >
                      See all results for "{searchTerm}" <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-slate-500">
                    No products found for "{searchTerm}".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              Products
            </NavLink>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-900 py-2 transition-colors"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-dropdown border border-slate-200 p-2 z-50 animate-fade-in">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.id}`}
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-colors text-sm font-medium"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-indigo-600">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Cart Icon & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative flex items-center gap-2.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 px-3.5 py-2 rounded-xl text-slate-800 transition-all group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {summary.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-scale-up">
                    {summary.totalItems > 99 ? '99+' : summary.totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-slate-800 group-hover:text-indigo-600">
                {formatCurrency(summary.subtotal)}
              </span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Open mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-fade-in shadow-lg">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-indigo-600 text-slate-900"
            />
            <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Mobile Links */}
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              All Products
            </Link>

            <div className="pt-2 pb-1 border-t border-slate-100">
              <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Categories
              </span>
              <div className="mt-1 space-y-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              About ShopSphere
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
