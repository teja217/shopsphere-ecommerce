import { cartService } from '../services/cartService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const cartController = {
  async getCart(req, res, next) {
    try {
      const sessionId = req.headers['x-session-id'] || 'default-session';
      const cart = await cartService.getCart(sessionId);
      return successResponse(res, cart, 'Cart retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  async addToCart(req, res, next) {
    try {
      const sessionId = req.headers['x-session-id'] || 'default-session';
      const { productId, quantity } = req.body;
      const cart = await cartService.addToCart(productId, quantity, sessionId);
      return successResponse(res, cart, 'Item added to cart successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async updateCartItem(req, res, next) {
    try {
      const sessionId = req.headers['x-session-id'] || 'default-session';
      const { id } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.updateCartItem(id, quantity, sessionId);
      return successResponse(res, cart, 'Cart updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async removeFromCart(req, res, next) {
    try {
      const sessionId = req.headers['x-session-id'] || 'default-session';
      const { id } = req.params;
      const cart = await cartService.removeFromCart(id, sessionId);
      return successResponse(res, cart, 'Item removed from cart successfully');
    } catch (error) {
      next(error);
    }
  },

  async clearCart(req, res, next) {
    try {
      const sessionId = req.headers['x-session-id'] || 'default-session';
      const cart = await cartService.clearCart(sessionId);
      return successResponse(res, cart, 'Cart cleared successfully');
    } catch (error) {
      next(error);
    }
  },
};
