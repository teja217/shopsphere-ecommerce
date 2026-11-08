import { contactService } from '../services/contactService.js';
import { cartService } from '../services/cartService.js';
import { successResponse } from '../utils/responseHandler.js';

export const contactController = {
  async submitContact(req, res, next) {
    try {
      const { name, email, subject, message } = req.body;
      const result = await contactService.submitContactForm({ name, email, subject, message });
      return successResponse(
        res,
        result,
        'Thank you! Your message has been received. Our team will get back to you within 24 hours.',
        201
      );
    } catch (error) {
      next(error);
    }
  },

  async processCheckout(req, res, next) {
    try {
      const sessionId = req.headers['x-session-id'] || 'default-session';
      const { shippingAddress, paymentMethod, items, summary } = req.body;

      const orderId = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

      // Clear the session cart
      await cartService.clearCart(sessionId);

      const orderData = {
        orderId,
        placedAt: new Date().toISOString(),
        shippingAddress,
        paymentMethod: paymentMethod || 'Credit Card',
        items: items || [],
        summary: summary || {},
        status: 'Confirmed',
        estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };

      return successResponse(
        res,
        orderData,
        `Order ${orderId} placed successfully!`,
        201
      );
    } catch (error) {
      next(error);
    }
  },
};
