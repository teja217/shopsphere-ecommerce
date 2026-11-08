import { sampleProducts, sampleCategories } from '../utils/seedData.js';

class FallbackStore {
  constructor() {
    this.categories = JSON.parse(JSON.stringify(sampleCategories));
    this.products = JSON.parse(JSON.stringify(sampleProducts));
    this.cart = [];
    this.contacts = [];
  }

  // Categories
  getCategories() {
    return this.categories;
  }

  // Products
  getProducts({ search, category, minPrice, maxPrice, sortBy, page = 1, limit = 12 }) {
    let filtered = [...this.products];

    // Search query
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.categoryName.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Price range filter
    if (minPrice !== undefined && minPrice !== '') {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        filtered = filtered.filter(p => p.price >= min);
      }
    }
    if (maxPrice !== undefined && maxPrice !== '') {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        filtered = filtered.filter(p => p.price <= max);
      }
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNewArrival === a.isNewArrival ? 0 : b.isNewArrival ? 1 : -1));
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
    }

    const totalProducts = filtered.length;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const totalPages = Math.ceil(totalProducts / limitNum) || 1;
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = filtered.slice(startIndex, startIndex + limitNum);

    return {
      products: paginated,
      meta: {
        totalProducts,
        totalPages,
        currentPage: pageNum,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    };
  }

  getProductById(id) {
    return this.products.find(p => p.id === id || p._id === id || p.slug === id) || null;
  }

  getProductsByCategory(categorySlug) {
    return this.products.filter(p => p.category.toLowerCase() === categorySlug.toLowerCase());
  }

  searchProducts(keyword) {
    if (!keyword) return [];
    const q = keyword.toLowerCase().trim();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // Cart operations
  getCart() {
    const subtotal = this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
    const estimatedTax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = Math.round((subtotal + shipping + estimatedTax) * 100) / 100;
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items: this.cart,
      summary: {
        totalItems,
        subtotal: Math.round(subtotal * 100) / 100,
        shipping,
        tax: estimatedTax,
        total,
      },
    };
  }

  addToCart(productId, quantity = 1) {
    const product = this.getProductById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    const qty = parseInt(quantity, 10) || 1;
    const existingIndex = this.cart.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += qty;
    } else {
      this.cart.push({
        id: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
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
        addedAt: new Date().toISOString(),
      });
    }

    return this.getCart();
  }

  updateCartItem(itemId, quantity) {
    const qty = parseInt(quantity, 10);
    const index = this.cart.findIndex(item => item.id === itemId || item.product.id === itemId);

    if (index === -1) {
      throw new Error(`Item ${itemId} not found in cart`);
    }

    if (qty <= 0) {
      this.cart.splice(index, 1);
    } else {
      this.cart[index].quantity = qty;
    }

    return this.getCart();
  }

  removeFromCart(itemId) {
    const initialLength = this.cart.length;
    this.cart = this.cart.filter(item => item.id !== itemId && item.product.id !== itemId);
    if (this.cart.length === initialLength) {
      throw new Error(`Item ${itemId} not found in cart`);
    }
    return this.getCart();
  }

  clearCart() {
    this.cart = [];
    return this.getCart();
  }

  // Contact
  addContactMessage({ name, email, subject, message }) {
    const newContact = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: 'received',
    };
    this.contacts.push(newContact);
    return newContact;
  }
}

export const fallbackStore = new FallbackStore();
