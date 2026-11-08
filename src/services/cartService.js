import { apiClient } from './api';

export const cartService = {
  async getCart() {
    const res = await apiClient('/cart');
    return res.data;
  },

  async addToCart(productId, quantity = 1) {
    const res = await apiClient('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
    return res.data;
  },

  async updateQuantity(itemId, quantity) {
    const res = await apiClient(`/cart/${encodeURIComponent(itemId)}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
    return res.data;
  },

  async removeItem(itemId) {
    const res = await apiClient(`/cart/${encodeURIComponent(itemId)}`, {
      method: 'DELETE',
    });
    return res.data;
  },

  async clearCart() {
    const res = await apiClient('/cart', {
      method: 'DELETE',
    });
    return res.data;
  },
};
