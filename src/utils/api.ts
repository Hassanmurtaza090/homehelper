import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, STORAGE_KEYS, MOCK_API } from './constants';
import { UserRole, User } from '@/types/user';

// Demo users for mock auth
const DEMO_USERS: Array<{ email: string; password: string; role: UserRole; name: string }> = [
  { email: 'user@demo.com', password: 'Demo123!', role: UserRole.USER, name: 'Demo User' },
  { email: 'provider@demo.com', password: 'Demo123!', role: UserRole.PROVIDER, name: 'Demo Provider' },
  { email: 'admin@demo.com', password: 'Demo123!', role: UserRole.ADMIN, name: 'Demo Admin' },
];

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // send HttpOnly cookies
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Using HttpOnly cookies; no Authorization header injection needed
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config || {};
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        await new Promise<void>((resolve) => pendingRequests.push(resolve));
        originalRequest._retry = true;
        return api(originalRequest);
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        await authAPI.refreshToken();
        isRefreshing = false;
        pendingRequests.forEach((cb) => cb());
        pendingRequests = [];
        return api(originalRequest);
      } catch (refreshErr) {
        isRefreshing = false;
        pendingRequests = [];
        // redirect to login on failed refresh
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

// API methods
export const apiClient = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config).then((response) => response.data),
    
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.post<T>(url, data, config).then((response) => response.data),
    
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.put<T>(url, data, config).then((response) => response.data),
    
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.patch<T>(url, data, config).then((response) => response.data),
    
  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config).then((response) => response.data),
};

// If MOCK_API is enabled, provide mock implementations for auth endpoints
const mockAuth = {
  login: async (credentials: { email: string; password: string }) => {
    const match = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password
    );
    if (!match) {
      const error: any = new Error('Invalid email or password');
      error.response = { data: { message: 'Invalid email or password' } };
      throw error;
    }
    const token = btoa(`${match.email}:${Date.now()}`);
    const user: User = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      email: match.email,
      name: match.name,
      role: match.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    return { token, user };
  },
  forgotPassword: async (email: string) => {
    // pretend to send email
    return { success: true, message: 'Password reset link sent to email if it exists.' };
  },
  resetPassword: async (token: string, password: string) => {
    // accept any token in mock
    return { success: true };
  },
  register: async (data: any) => {
    // Accept any registration and return demo token (role optional, default user)
    const role = data.role || UserRole.USER;
    const token = btoa(`${data.email}:${Date.now()}`);
    const user: User = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      email: data.email,
      name: data.name || 'New User',
      role,
      phone: data.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    return { token, user };
  },
  logout: async () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    return { success: true };
  },
  me: async () => {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (!raw) throw new Error('Not authenticated');
    return JSON.parse(raw);
  },
};

// Auth API endpoints
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    MOCK_API ? mockAuth.login(credentials) : apiClient.post('/auth/login', credentials),
    
  register: (data: any) =>
    MOCK_API ? mockAuth.register(data) : apiClient.post('/auth/register', data),
    
  logout: () =>
    MOCK_API ? mockAuth.logout() : apiClient.post('/auth/logout'),
    
  me: () =>
    MOCK_API ? mockAuth.me() : apiClient.get('/auth/me'),
    
  refreshToken: () =>
    apiClient.post('/auth/refresh'),
    
  forgotPassword: (email: string) =>
    MOCK_API ? mockAuth.forgotPassword(email) : apiClient.post('/auth/forgot-password', { email }),
    
  resetPassword: (token: string, password: string) =>
    MOCK_API ? mockAuth.resetPassword(token, password) : apiClient.post('/auth/reset-password', { token, password }),
};

// User API endpoints
export const userAPI = {
  getProfile: () =>
    apiClient.get('/users/profile'),
    
  updateProfile: (data: any) =>
    apiClient.put('/users/profile', data),
    
  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    apiClient.post('/users/change-password', data),
    
  deleteAccount: () =>
    apiClient.delete('/users/account'),
};

// Service API endpoints
export const serviceAPI = {
  getAll: (params?: any) =>
    apiClient.get('/services', { params }),
    
  getById: (id: string) =>
    apiClient.get(`/services/${id}`),
    
  getByCategory: (category: string) =>
    apiClient.get(`/services/category/${category}`),
    
  search: (query: string) =>
    apiClient.get('/services/search', { params: { q: query } }),
    
  create: (data: any) =>
    apiClient.post('/services', data),
    
  update: (id: string, data: any) =>
    apiClient.put(`/services/${id}`, data),
    
  delete: (id: string) =>
    apiClient.delete(`/services/${id}`),
};

// Booking API endpoints
export const bookingAPI = {
  create: (data: any) =>
    apiClient.post('/bookings', data),
    
  getAll: (params?: any) =>
    apiClient.get('/bookings', { params }),
    
  getById: (id: string) =>
    apiClient.get(`/bookings/${id}`),
    
  getUserBookings: () =>
    apiClient.get('/bookings/user'),
    
  getProviderBookings: () =>
    apiClient.get('/bookings/provider'),
    
  updateStatus: (id: string, status: string) =>
    apiClient.patch(`/bookings/${id}/status`, { status }),
    
  cancel: (id: string, reason?: string) =>
    apiClient.post(`/bookings/${id}/cancel`, { reason }),
    
  rate: (id: string, data: { rating: number; comment: string }) =>
    apiClient.post(`/bookings/${id}/review`, data),
};

// Provider API endpoints
export const providerAPI = {
  getAvailability: () =>
    apiClient.get('/providers/availability'),
    
  updateAvailability: (data: any) =>
    apiClient.put('/providers/availability', data),
    
  getStats: () =>
    apiClient.get('/providers/stats'),
    
  getEarnings: (params?: any) =>
    apiClient.get('/providers/earnings', { params }),
    
  getReviews: () =>
    apiClient.get('/providers/reviews'),
};

// Admin API endpoints
export const adminAPI = {
  getDashboardStats: () =>
    apiClient.get('/admin/stats'),
    
  getUsers: (params?: any) =>
    apiClient.get('/admin/users', { params }),
    
  updateUserStatus: (userId: string, status: string) =>
    apiClient.patch(`/admin/users/${userId}/status`, { status }),
    
  getReports: (type: string, params?: any) =>
    apiClient.get(`/admin/reports/${type}`, { params }),
    
  getSystemSettings: () =>
    apiClient.get('/admin/settings'),
    
  updateSystemSettings: (data: any) =>
    apiClient.put('/admin/settings', data),
};

export default api;
