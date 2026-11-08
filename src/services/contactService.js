import { apiClient } from './api';

export const contactService = {
  async submitContact(formData) {
    const res = await apiClient('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return res;
  },

  async processCheckout(checkoutData) {
    const res = await apiClient('/contact/checkout', {
      method: 'POST',
      body: JSON.stringify(checkoutData),
    });
    return res.data;
  },
};
