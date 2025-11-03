import { BookingStatus, Booking, PaymentMethod, PaymentStatus } from '@/types/booking';
import { ServiceCategory } from '@/types/service';
import { ServiceProvider, UserRole, Availability } from '@/types/user';
import { Review } from '@/types/service';

// Mock Provider Profile
export const mockProviderProfile: ServiceProvider = {
  id: 'current-provider',
  email: 'provider@example.com',
  name: 'Alex Johnson',
  role: UserRole.PROVIDER,
  phone: '+1-555-1234',
  avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200',
  address: {
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
  },
  rating: 4.7,
  totalReviews: 48,
  servicesOffered: [
    ServiceCategory.PLUMBING,
    ServiceCategory.ELECTRICAL,
  ],
  availability: [
    { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
    { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
    { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
    { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
    { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isAvailable: true },
    { dayOfWeek: 6, startTime: '10:00', endTime: '15:00', isAvailable: false },
    { dayOfWeek: 0, startTime: '00:00', endTime: '00:00', isAvailable: false },
  ],
  verified: true,
  bio: 'Certified plumber and electrician with 8+ years of experience in residential and commercial services. Specialized in installations, repairs, and maintenance.',
  experience: 8,
  createdAt: new Date('2022-06-15'),
  updatedAt: new Date('2023-11-10'),
  cnic: '12345-1234567-1', // Added CNIC field
};

// Mock Jobs for the provider
export const mockProviderJobs: Booking[] = [
  {
    id: 'job-1',
    serviceId: '4',
    service: {
      id: '4',
      name: 'Plumbing Repair',
      description: 'Expert plumbing services for leaks, clogs, and installations',
      category: ServiceCategory.PLUMBING,
      price: 80,
      priceUnit: 'hour',
      duration: 60,
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400',
      rating: 4.6,
      totalReviews: 156,
      features: ['24/7 Emergency', 'Licensed plumbers', 'Free estimates', 'Warranty included'],
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    userId: 'user-1',
    user: {
      id: 'user-1',
      email: 'client1@example.com',
      name: 'Emma Thompson',
      role: UserRole.USER,
      phone: '+1-555-9876',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    providerId: 'current-provider',
    status: BookingStatus.CONFIRMED,
    scheduledDate: new Date(Date.now() + 86400000), // Tomorrow
    scheduledTime: '10:00',
    duration: 120,
    address: {
      street: '456 Park Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      country: 'USA',
    },
    notes: 'Leaking kitchen sink that needs urgent repair',
    price: 160, // 2 hours at $80/hour
    paymentMethod: PaymentMethod.CREDIT_CARD,
    paymentStatus: PaymentStatus.PAID,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: 'job-2',
    serviceId: '5',
    service: {
      id: '5',
      name: 'Electrical Services',
      description: 'Certified electricians for safe and reliable electrical work',
      category: ServiceCategory.ELECTRICAL,
      price: 90,
      priceUnit: 'hour',
      duration: 60,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
      rating: 4.9,
      totalReviews: 189,
      features: ['Licensed & Insured', 'Same-day service', 'Warranty included', 'Safety certified'],
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    userId: 'user-2',
    user: {
      id: 'user-2',
      email: 'client2@example.com',
      name: 'Michael Brown',
      role: UserRole.USER,
      phone: '+1-555-5678',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    providerId: 'current-provider',
    status: BookingStatus.IN_PROGRESS,
    scheduledDate: new Date(), // Today
    scheduledTime: '14:00',
    duration: 180,
    address: {
      street: '789 Broadway',
      city: 'New York',
      state: 'NY',
      zipCode: '10003',
      country: 'USA',
    },
    notes: 'Need to install new light fixtures in living room and kitchen',
    price: 270, // 3 hours at $90/hour
    paymentMethod: PaymentMethod.CREDIT_CARD,
    paymentStatus: PaymentStatus.PAID,
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: 'job-3',
    serviceId: '4',
    service: {
      id: '4',
      name: 'Plumbing Repair',
      description: 'Expert plumbing services for leaks, clogs, and installations',
      category: ServiceCategory.PLUMBING,
      price: 80,
      priceUnit: 'hour',
      duration: 60,
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400',
      rating: 4.6,
      totalReviews: 156,
      features: ['24/7 Emergency', 'Licensed plumbers', 'Free estimates', 'Warranty included'],
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    userId: 'user-3',
    user: {
      id: 'user-3',
      email: 'client3@example.com',
      name: 'Sophia Wilson',
      role: UserRole.USER,
      phone: '+1-555-1122',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    providerId: 'current-provider',
    status: BookingStatus.PENDING,
    scheduledDate: new Date(Date.now() + 172800000), // Day after tomorrow
    scheduledTime: '11:30',
    duration: 90,
    address: {
      street: '321 5th Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10016',
      country: 'USA',
    },
    notes: 'Bathroom sink drain is clogged',
    price: 120, // 1.5 hours at $80/hour
    paymentMethod: PaymentMethod.PAYPAL,
    paymentStatus: PaymentStatus.PENDING,
    createdAt: new Date(Date.now() - 43200000), // 12 hours ago
    updatedAt: new Date(Date.now() - 43200000), // 12 hours ago
  },
  {
    id: 'job-4',
    serviceId: '5',
    service: {
      id: '5',
      name: 'Electrical Services',
      description: 'Certified electricians for safe and reliable electrical work',
      category: ServiceCategory.ELECTRICAL,
      price: 90,
      priceUnit: 'hour',
      duration: 60,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
      rating: 4.9,
      totalReviews: 189,
      features: ['Licensed & Insured', 'Same-day service', 'Warranty included', 'Safety certified'],
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    userId: 'user-4',
    user: {
      id: 'user-4',
      email: 'client4@example.com',
      name: 'Daniel Martinez',
      role: UserRole.USER,
      phone: '+1-555-3344',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    providerId: 'current-provider',
    status: BookingStatus.COMPLETED,
    scheduledDate: new Date(Date.now() - 86400000), // Yesterday
    scheduledTime: '09:00',
    duration: 120,
    address: {
      street: '567 Madison Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      country: 'USA',
    },
    notes: 'Electrical panel upgrade and safety inspection',
    price: 180, // 2 hours at $90/hour
    paymentMethod: PaymentMethod.CREDIT_CARD,
    paymentStatus: PaymentStatus.PAID,
    createdAt: new Date(Date.now() - 345600000), // 4 days ago
    updatedAt: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: 'job-5',
    serviceId: '4',
    service: {
      id: '4',
      name: 'Plumbing Repair',
      description: 'Expert plumbing services for leaks, clogs, and installations',
      category: ServiceCategory.PLUMBING,
      price: 80,
      priceUnit: 'hour',
      duration: 60,
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400',
      rating: 4.6,
      totalReviews: 156,
      features: ['24/7 Emergency', 'Licensed plumbers', 'Free estimates', 'Warranty included'],
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    userId: 'user-5',
    user: {
      id: 'user-5',
      email: 'client5@example.com',
      name: 'Olivia Johnson',
      role: UserRole.USER,
      phone: '+1-555-5566',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    providerId: 'current-provider',
    status: BookingStatus.CANCELLED,
    scheduledDate: new Date(Date.now() - 172800000), // 2 days ago
    scheduledTime: '13:00',
    duration: 60,
    address: {
      street: '890 Lexington Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10065',
      country: 'USA',
    },
    notes: 'Water heater installation',
    price: 80, // 1 hour at $80/hour
    paymentMethod: PaymentMethod.DEBIT_CARD,
    paymentStatus: PaymentStatus.REFUNDED,
    createdAt: new Date(Date.now() - 432000000), // 5 days ago
    updatedAt: new Date(Date.now() - 259200000), // 3 days ago
  },
];

// Mock Feedback/Reviews for the provider
export const mockProviderReviews: Review[] = [
  {
    id: 'review-1',
    userId: 'user-4',
    userName: 'Daniel Martinez',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    rating: 5,
    comment: 'Alex did an amazing job upgrading our electrical panel. Very professional, on time, and cleaned up after the work. Highly recommend!',
    date: new Date(Date.now() - 86400000), // 1 day ago
    serviceId: '5',
    providerId: 'current-provider',
    helpful: 3,
  },
  {
    id: 'review-2',
    userId: 'user-6',
    userName: 'Jennifer Adams',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    rating: 5,
    comment: 'Fixed our plumbing issue quickly and efficiently. Very knowledgeable and explained everything clearly. Will definitely use again!',
    date: new Date(Date.now() - 604800000), // 1 week ago
    serviceId: '4',
    providerId: 'current-provider',
    helpful: 5,
  },
  {
    id: 'review-3',
    userId: 'user-7',
    userName: 'Robert Taylor',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    rating: 4,
    comment: 'Good service overall. Fixed our electrical issues but arrived a bit late. Otherwise, very professional and knew exactly what to do.',
    date: new Date(Date.now() - 1209600000), // 2 weeks ago
    serviceId: '5',
    providerId: 'current-provider',
    helpful: 2,
  },
  {
    id: 'review-4',
    userId: 'user-8',
    userName: 'Patricia Moore',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
    rating: 5,
    comment: 'Alex installed a new bathroom sink for us and did an excellent job. Very neat work and reasonable pricing. Would hire again!',
    date: new Date(Date.now() - 1814400000), // 3 weeks ago
    serviceId: '4',
    providerId: 'current-provider',
    helpful: 4,
  },
  {
    id: 'review-5',
    userId: 'user-9',
    userName: 'William Garcia',
    userAvatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100',
    rating: 4,
    comment: 'Fixed our electrical outlets that weren\'t working. Prompt service and fair pricing. Took the time to explain what went wrong.',
    date: new Date(Date.now() - 2419200000), // 4 weeks ago
    serviceId: '5',
    providerId: 'current-provider',
    helpful: 1,
  },
];

// Dashboard statistics
export const providerDashboardStats = {
  totalEarnings: 1250,
  jobsCompleted: 18,
  pendingJobs: 3,
  averageRating: 4.7,
  monthlyStats: [
    { month: 'Jan', earnings: 680, jobs: 8 },
    { month: 'Feb', earnings: 820, jobs: 10 },
    { month: 'Mar', earnings: 950, jobs: 12 },
    { month: 'Apr', earnings: 1100, jobs: 14 },
    { month: 'May', earnings: 1250, jobs: 18 },
  ],
  recentActivity: [
    {
      id: 'activity-1',
      type: 'booking_confirmed',
      message: 'New booking confirmed with Emma Thompson',
      time: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: 'activity-2',
      type: 'job_completed',
      message: 'Job completed for Daniel Martinez',
      time: new Date(Date.now() - 172800000), // 2 days ago
    },
    {
      id: 'activity-3',
      type: 'review_received',
      message: 'New 5-star review from Daniel Martinez',
      time: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: 'activity-4',
      type: 'payment_received',
      message: 'Payment of $180 received for electrical panel upgrade',
      time: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: 'activity-5',
      type: 'booking_request',
      message: 'New booking request from Sophia Wilson',
      time: new Date(Date.now() - 43200000), // 12 hours ago
    },
  ],
};

// Service categories for dropdown
export const serviceCategories = [
  { value: ServiceCategory.CLEANING, label: 'Cleaning' },
  { value: ServiceCategory.PLUMBING, label: 'Plumbing' },
  { value: ServiceCategory.ELECTRICAL, label: 'Electrical' },
  { value: ServiceCategory.PAINTING, label: 'Painting' },
  { value: ServiceCategory.CARPENTRY, label: 'Carpentry' },
  { value: ServiceCategory.GARDENING, label: 'Gardening' },
  { value: ServiceCategory.APPLIANCE, label: 'Appliance Repair' },
  { value: ServiceCategory.MOVING, label: 'Moving' },
  { value: ServiceCategory.PEST_CONTROL, label: 'Pest Control' },
  { value: ServiceCategory.OTHER, label: 'Other' },
];

// Weekly availability template
export const weekDays = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

// Default availability template
export const defaultAvailability: Availability[] = [
  { dayOfWeek: 0, startTime: '09:00', endTime: '17:00', isAvailable: false },
  { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
  { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
  { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
  { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
  { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isAvailable: true },
  { dayOfWeek: 6, startTime: '09:00', endTime: '17:00', isAvailable: false },
];
