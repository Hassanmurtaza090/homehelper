export enum UserRole {
  USER = 'user',
  PROVIDER = 'provider',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  address?: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role?: UserRole; // Optional - will be determined automatically by email pattern
  phone?: string;
}

export interface ServiceProvider extends User {
  rating: number;
  totalReviews: number;
  servicesOffered: string[];
  availability: Availability[];
  verified: boolean;
  bio?: string;
  experience?: number; // years
  cnic?: string; // CNIC/ID number
  serviceExperience?: Record<string, number>; // Experience per service category
}

export interface Availability {
  dayOfWeek: number; // 0-6, Sunday to Saturday
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isAvailable: boolean;
}
