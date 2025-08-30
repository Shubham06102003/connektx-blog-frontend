import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE = process.env.NEXT_BACKEND_URL || "http://localhost:8080/api";

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // in case backend uses cookies
});

// Attach auth token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('admin_token'); // stored at login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------
// Public API calls
// --------------------
export const publicApi = {
  getBlogs: () => api.get('/blogs'),
  getPublishedBlogs: () => api.get('/blogs/published'),
  getFeaturedBlogs: () => api.get('/blogs/featured'),
  getBlogBySlug: (slug) => api.get(`/blogs/slug/${slug}`),
  getCategories: () => api.get('/categories'),
  getCategoryBySlug: (slug) => api.get(`/categories/slug/${slug}`),
};

// --------------------
// Admin API calls
// --------------------
export const adminApi = {
  // Authentication
  login: (username, password) =>
    api.post('/login', { username, password }),
  bootstrap: (username, password) =>
    api.post('/bootstrap', { username, password }),

  // Blog management
  createBlog: (blog) => api.post('/admin/blogs', blog),
  updateBlog: (id, blog) => api.put(`/admin/blogs/${id}`, blog),
  deleteBlog: (id) => api.delete(`/admin/blogs/${id}`),

  // Category management
  createCategory: (category) => api.post('/admin/categories', category),
  updateCategory: (id, category) => api.put(`/admin/categories/${id}`, category),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`),
};
