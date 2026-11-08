import { productService } from '../services/productService.js';
import { successResponse } from '../utils/responseHandler.js';

export const categoryController = {
  async getCategories(req, res, next) {
    try {
      const categories = await productService.getCategories();
      return successResponse(res, categories, 'Categories retrieved successfully');
    } catch (error) {
      next(error);
    }
  },
};
