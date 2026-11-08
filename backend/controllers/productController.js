import { productService } from '../services/productService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const productController = {
  async getProducts(req, res, next) {
    try {
      const { search, category, minPrice, maxPrice, sortBy, page, limit } = req.query;
      const result = await productService.getProducts({
        search,
        category,
        minPrice,
        maxPrice,
        sortBy,
        page,
        limit,
      });

      return successResponse(
        res,
        result.products,
        'Products retrieved successfully',
        200,
        result.meta
      );
    } catch (error) {
      next(error);
    }
  },

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);

      if (!product) {
        return errorResponse(res, `Product with ID '${id}' not found`, 404);
      }

      return successResponse(res, product, 'Product details retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  async getProductsByCategory(req, res, next) {
    try {
      const { category } = req.params;
      const products = await productService.getProductsByCategory(category);
      return successResponse(
        res,
        products,
        `Products for category '${category}' retrieved successfully`
      );
    } catch (error) {
      next(error);
    }
  },

  async searchProducts(req, res, next) {
    try {
      const { q } = req.query;
      if (!q || !q.trim()) {
        return successResponse(res, [], 'Search query was empty');
      }
      const products = await productService.searchProducts(q);
      return successResponse(
        res,
        products,
        `Found ${products.length} products matching '${q}'`
      );
    } catch (error) {
      next(error);
    }
  },
};
