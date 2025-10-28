import { Service } from './service';
import { User, ServiceProvider, Address } from './user';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export interface Booking {
  id: string;
  serviceId: string;
  service: Service;
  userId: string;
  user: User;
  providerId?: string;
  provider?: ServiceProvider;
  status: BookingStatus;
  scheduledDate: Date;
  scheduledTime: string;
  duration: number; // in minutes
  address: Address;
  notes?: string;
  price: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingDetails extends Booking {
  timeline: BookingTimeline[];
  cancellationReason?: string;
  review?: BookingReview;
  invoice?: Invoice;
}

export interface BookingTimeline {
  id: string;
  status: BookingStatus;
  timestamp: Date;
  description: string;
  updatedBy: string;
}

export interface BookingReview {
  id: string;
  bookingId: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface Invoice {
  id: string;
  bookingId: string;
  invoiceNumber: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  items: InvoiceItem[];
  issuedDate: Date;
  dueDate: Date;
  paidDate?: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface BookingState {
  currentBooking: Partial<Booking> | null;
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  step: number;
}
