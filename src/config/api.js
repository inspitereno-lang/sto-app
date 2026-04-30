const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = {
  // Auth
  login: (data) => fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),

  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/products${query ? '?' + query : ''}`);
  },
  getProduct: (id) => fetch(`${API_BASE}/products/${id}`),

  // Categories
  getCategories: () => fetch(`${API_BASE}/categories`),

  // Blogs
  getBlogs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/blogs${query ? '?' + query : ''}`);
  },
  getBlog: (idOrSlug, lang) => {
    const query = lang ? `?lang=${lang}` : '';
    return fetch(`${API_BASE}/blogs/${idOrSlug}${query}`);
  },
};


export default API_BASE;
