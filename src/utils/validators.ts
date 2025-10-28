import { VALIDATION } from './constants';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  if (!VALIDATION.EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  return { isValid: true };
};

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return { 
      isValid: false, 
      error: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters` 
    };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  return { isValid: true };
};

// Name validation
export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, error: 'Name is required' };
  }
  if (name.length < VALIDATION.NAME_MIN_LENGTH) {
    return { 
      isValid: false, 
      error: `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters` 
    };
  }
  if (name.length > VALIDATION.NAME_MAX_LENGTH) {
    return { 
      isValid: false, 
      error: `Name must not exceed ${VALIDATION.NAME_MAX_LENGTH} characters` 
    };
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return { isValid: false, error: 'Name can only contain letters and spaces' };
  }
  return { isValid: true };
};

// Phone validation
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }
  if (!VALIDATION.PHONE_REGEX.test(phone)) {
    return { isValid: false, error: 'Invalid phone number format' };
  }
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return { isValid: false, error: 'Phone number must be between 10 and 15 digits' };
  }
  return { isValid: true };
};

// Date validation
export const validateDate = (date: string | Date): ValidationResult => {
  if (!date) {
    return { isValid: false, error: 'Date is required' };
  }
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }
  return { isValid: true };
};

// Future date validation
export const validateFutureDate = (date: string | Date): ValidationResult => {
  const dateValidation = validateDate(date);
  if (!dateValidation.isValid) {
    return dateValidation;
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  if (dateObj < now) {
    return { isValid: false, error: 'Date must be in the future' };
  }
  return { isValid: true };
};

// Address validation
export const validateAddress = (address: {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}): ValidationResult => {
  if (!address.street) {
    return { isValid: false, error: 'Street address is required' };
  }
  if (!address.city) {
    return { isValid: false, error: 'City is required' };
  }
  if (!address.state) {
    return { isValid: false, error: 'State is required' };
  }
  if (!address.zipCode) {
    return { isValid: false, error: 'ZIP code is required' };
  }
  if (!/^\d{5}(-\d{4})?$/.test(address.zipCode)) {
    return { isValid: false, error: 'Invalid ZIP code format' };
  }
  return { isValid: true };
};

// Form validation helper
export const validateForm = <T extends Record<string, any>>(
  data: T,
  validators: Partial<Record<keyof T, (value: any) => ValidationResult>>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } => {
  const errors: Partial<Record<keyof T, string>> = {};
  let isValid = true;
  
  for (const [field, validator] of Object.entries(validators)) {
    if (validator) {
      const result = (validator as any)(data[field as keyof T]);
      if (!result.isValid) {
        errors[field as keyof T] = result.error;
        isValid = false;
      }
    }
  }
  
  return { isValid, errors };
};

// Utility functions
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string | Date, format: string = 'short'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  
  if (format === 'long') {
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return dateObj.toLocaleDateString();
};

export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
