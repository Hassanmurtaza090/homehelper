export enum ServiceCategory {
  CLEANING = 'cleaning',
  PLUMBING = 'plumbing',
  ELECTRICAL = 'electrical',
  PAINTING = 'painting',
  CARPENTRY = 'carpentry',
  GARDENING = 'gardening',
  APPLIANCE = 'appliance',
  MOVING = 'moving',
  PEST_CONTROL = 'pest_control',
  OTHER = 'other',
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: number;
  priceUnit: 'hour' | 'fixed' | 'sqft';
  duration?: number; // in minutes
  image: string;
  rating: number;
  totalReviews: number;
  features: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceDetails extends Service {
  detailedDescription: string;
  beforeYouBook: string[];
  whatIsIncluded: string[];
  faqs: FAQ[];
  reviews: Review[];
  relatedServices: Service[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  serviceId: string;
  providerId?: string;
  helpful: number;
  images?: string[];
}
