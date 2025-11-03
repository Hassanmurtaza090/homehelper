export const APP_NAME = 'HomeHelper';
export const APP_VERSION = '1.0.0';
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const MOCK_API = (import.meta as any).env?.VITE_MOCK_API !== 'false';
console.log('🔧 Environment check - VITE_MOCK_API:', (import.meta as any).env?.VITE_MOCK_API);
console.log('🔧 MOCK_API final value:', MOCK_API);

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  CONTACT: '/contact',
  
  // User routes
  USER_SERVICES: '/user/services',
  USER_SERVICE_DETAILS: '/user/services/:id',
  USER_BOOKING: '/user/booking/:id',
  USER_MY_BOOKINGS: '/user/my-bookings',
  USER_PROFILE: '/user/profile',
  
  // Provider routes
  PROVIDER_DASHBOARD: '/provider/dashboard',
  PROVIDER_JOBS: '/provider/jobs',
  PROVIDER_JOB_DETAILS: '/provider/jobs/:id',
  PROVIDER_AVAILABILITY: '/provider/availability',
  PROVIDER_PROFILE: '/provider/profile',
  PROVIDER_FEEDBACK: '/provider/feedback',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_SERVICES: '/admin/services',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_SETTINGS: '/admin/settings',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME: 'theme',
  LANGUAGE: 'language',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMITS: [5, 10, 20, 50],
};

export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  INPUT: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  FULL: 'MMM DD, YYYY HH:mm',
};

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-()]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

export const SERVICE_CATEGORIES = [
  { value: 'cleaning', label: 'Cleaning', icon: '🧹' },
  { value: 'plumbing', label: 'Plumbing', icon: '🔧' },
  { value: 'electrical', label: 'Electrical', icon: '⚡' },
  { value: 'painting', label: 'Painting', icon: '🎨' },
  { value: 'carpentry', label: 'Carpentry', icon: '🔨' },
  { value: 'gardening', label: 'Gardening', icon: '🌱' },
  { value: 'appliance', label: 'Appliance Repair', icon: '🔌' },
  { value: 'moving', label: 'Moving', icon: '📦' },
  { value: 'pest_control', label: 'Pest Control', icon: '🐛' },
  { value: 'other', label: 'Other', icon: '🔄' },
];

export const BOOKING_STATUSES = {
  pending: { label: 'Pending', color: 'yellow' },
  confirmed: { label: 'Confirmed', color: 'blue' },
  in_progress: { label: 'In Progress', color: 'indigo' },
  completed: { label: 'Completed', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' },
  refunded: { label: 'Refunded', color: 'gray' },
};
