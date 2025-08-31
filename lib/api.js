// import axios from 'axios';
// import Cookies from 'js-cookie';

// const API_BASE = process.env.NEXT_BACKEND_URL || "http://localhost:8080/api";

// // Create axios instance
// export const api = axios.create({
//   baseURL: API_BASE,
//   // withCredentials: true, // in case backend uses cookies
// });

// // Attach auth token to every request if available
// api.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('admin_token'); // stored at login
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // --------------------
// // Public API calls
// // --------------------
// export const publicApi = {
//   getBlogs: () => api.get('/blogs'),
//   getPublishedBlogs: () => api.get('/blogs/published'),
//   getFeaturedBlogs: () => api.get('/blogs/featured'),
//   getBlogBySlug: (slug) => api.get(`/blogs/slug/${slug}`),
//   getCategories: () => api.get('/categories'),
//   getCategoryBySlug: (slug) => api.get(`/categories/slug/${slug}`),
// };

// // --------------------
// // Admin API calls
// // --------------------
// export const adminApi = {
//   // Authentication
//   login: (username, password) =>
//     api.post('/login', { username, password }),
//   bootstrap: (username, password) =>
//     api.post('/bootstrap', { username, password }),

//   // Blog management
//   createBlog: (blog) => api.post('/admin/blogs', blog),
//   updateBlog: (id, blog) => api.put(`/admin/blogs/${id}`, blog),
//   deleteBlog: (id) => api.delete(`/admin/blogs/${id}`),

//   // Category management
//   createCategory: (category) => api.post('/admin/categories', category),
//   updateCategory: (id, category) => api.put(`/admin/categories/${id}`, category),
//   deleteCategory: (id) => api.delete(`/admin/categories/${id}`),
// };
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // withCredentials: true, // in case backend uses cookies
});

// Attach auth token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('admin_token'); // stored at login
    console.log('Request to:', config.url, token ? 'with token' : 'no token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response from:', response.config.url, 'Status:', response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    
    // Clear invalid token on 401
    if (error.response?.status === 401) {
      Cookies.remove('admin_token');
    }
    
    return Promise.reject(error);
  }
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
  getBlogsByCategory: (categorySlug) => api.get(`/categories/{categorySlug}/blogs`)
};

// --------------------
// Admin API calls
// --------------------
export const adminApi = {
  // Authentication
  login: async (username, password) => {
    try {
      console.log('Attempting login for:', username);
      console.log('API URL:', `${API_BASE}/login`);
      
      const response = await api.post('/login', { 
        username: username.trim(), 
        password: password.trim() 
      });
      
      console.log('Login response:', response.data);
      
      // Save token from response
      if (response.data?.token) {
        Cookies.set('admin_token', response.data.token, { 
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/'
        });
        console.log('Token saved successfully');
      } else {
        console.warn('No token in response');
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error;
    }
  },
  
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
