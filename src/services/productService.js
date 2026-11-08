import { apiClient } from './api';

export const productService = {
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category && params.category !== 'all') query.append('category', params.category);
    if (params.minPrice !== undefined && params.minPrice !== '') query.append('minPrice', params.minPrice);
    if (params.maxPrice !== undefined && params.maxPrice !== '') query.append('maxPrice', params.maxPrice);
    if (params.sortBy) query.append('sortBy', params.sortBy);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);

    const queryString = query.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    const res = await apiClient(endpoint);
    return {
      products: res.data || [],
      meta: res.meta || {
        totalProducts: res.data?.length || 0,
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  },

  async getProductById(id) {
    const res = await apiClient(`/products/${encodeURIComponent(id)}`);
    return res.data;
  },

  async getProductsByCategory(category) {
    const res = await apiClient(`/products/category/${encodeURIComponent(category)}`);
    return res.data || [];
  },

  async searchProducts(keyword) {
    const res = await apiClient(`/products/search?q=${encodeURIComponent(keyword)}`);
    return res.data || [];
  },

  async getCategories() {
    const res = await apiClient('/categories');
    return res.data || [];
  },
};
