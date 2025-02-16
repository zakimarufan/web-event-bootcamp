import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth services
export const authService = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

// Event services
export const eventService = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  register: (eventId) => api.post(`/events/${eventId}/register`), // Matches backend route
};

// User services
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.put('/users/change-password', data),
  getMyEvents: () => api.get('/users/events'),
};

// Payment services
export const paymentService = {
  submitProof: (registrationId, data) => 
    api.post(`/payments/registrations/${registrationId}/proof`, data), // Matches backend route
  getMyPayments: () => api.get('/payments/my-payments'),
  getPendingPayments: () => api.get('/payments/pending'),
  confirmPayment: (registrationId, data) => 
    api.post(`/payments/registrations/${registrationId}/confirm`, data), // Matches backend route
};

// Admin services
export const adminService = {
  getAllUsers: () => api.get('/admin/users'),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  updateUserRole: (id, data) => api.put(`/admin/users/${id}/role`, data),
  getSalesReport: (params) => api.get('/admin/reports/sales', { params }),
  getEventReport: () => api.get('/admin/reports/events'),
};

// Blog Category services
export const blogCategoryService = {
  getAll: () => api.get('/blog-categories'),
  getById: (id) => api.get(`/blog-categories/${id}`),
  create: (data) => api.post('/blog-categories', data),
  update: (id, data) => api.put(`/blog-categories/${id}`, data),
  delete: (id) => api.delete(`/blog-categories/${id}`),
};

// Blog services
export const blogService = {
  getAll: () => api.get('/blogs'),
  getById: (id) => api.get(`/blogs/${id}`),
  getByCategory: (categoryId) => api.get(`/blogs/category/${categoryId}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
};
