import { isMongoConnected } from '../config/db.js';
import { Product } from '../models/Product.js';
import { fallbackStore } from './fallbackStore.js';
import { sampleCategories } from '../utils/seedData.js';

export const productService = {
  async getProducts(params) {
    if (!isMongoConnected()) {
      return fallbackStore.getProducts(params);
    }

    const { search, category, minPrice, maxPrice, sortBy, page = 1, limit = 12 } = params;
    const filter = {};

    if (search && search.trim()) {
      const q = search.trim();
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
      ];
    }

    if (category && category !== 'all') {
      filter.category = category.toLowerCase();
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined && minPrice !== '') filter.price.$gte = parseFloat(minPrice);
      if (maxPrice !== undefined && maxPrice !== '') filter.price.$lte = parseFloat(maxPrice);
    }

    let sort = {};
    switch (sortBy) {
      case 'price-asc':
        sort = { price: 1 };
        break;
      case 'price-desc':
        sort = { price: -1 };
        break;
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'newest':
        sort = { isNewArrival: -1, createdAt: -1 };
        break;
      case 'popular':
      default:
        sort = { reviewsCount: -1 };
        break;
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter).sort(sort).skip(skip).limit(limitNum);
    const totalPages = Math.ceil(totalProducts / limitNum) || 1;

    return {
      products,
      meta: {
        totalProducts,
        totalPages,
        currentPage: pageNum,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    };
  },

  async getProductById(id) {
    if (!isMongoConnected()) {
      return fallbackStore.getProductById(id);
    }
    return (
      (await Product.findOne({ id })) ||
      (await Product.findOne({ slug: id })) ||
      (await Product.findById(id).catch(() => null))
    );
  },

  async getProductsByCategory(categorySlug) {
    if (!isMongoConnected()) {
      return fallbackStore.getProductsByCategory(categorySlug);
    }
    return Product.find({ category: categorySlug.toLowerCase() });
  },

  async searchProducts(keyword) {
    if (!isMongoConnected()) {
      return fallbackStore.searchProducts(keyword);
    }
    const q = keyword.trim();
    return Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
      ],
    });
  },

  async getCategories() {
    return sampleCategories;
  },
};
