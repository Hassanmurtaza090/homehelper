import React, { createContext, useState, ReactNode } from 'react';
import { Booking, BookingState, BookingStatus, PaymentMethod, PaymentStatus } from '@/types/booking';
import { Service } from '@/types/service';
import { bookingAPI } from '@/utils/api';
import { Address } from '@/types/user';

interface BookingContextType extends BookingState {
  selectService: (service: Service) => void;
  setBookingDetails: (details: Partial<Booking>) => void;
  setAddress: (address: Address) => void;
  setSchedule: (date: Date, time: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  confirmBooking: () => Promise<Booking>;
  cancelBooking: (bookingId: string, reason?: string) => Promise<void>;
  loadUserBookings: () => Promise<void>;
  clearCurrentBooking: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
}

const initialState: BookingState = {
  currentBooking: null,
  bookings: [],
  isLoading: false,
  error: null,
  step: 1,
};

export const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookingState, setBookingState] = useState<BookingState>(initialState);

  const selectService = (service: Service) => {
    setBookingState({
      ...bookingState,
      currentBooking: {
        ...bookingState.currentBooking,
        serviceId: service.id,
        service,
        price: service.price,
        duration: service.duration || 60,
      },
      step: 2,
    });
  };

  const setBookingDetails = (details: Partial<Booking>) => {
    setBookingState({
      ...bookingState,
      currentBooking: {
        ...bookingState.currentBooking,
        ...details,
      },
    });
  };

  const setAddress = (address: Address) => {
    setBookingState({
      ...bookingState,
      currentBooking: {
        ...bookingState.currentBooking,
        address,
      },
    });
  };

  const setSchedule = (date: Date, time: string) => {
    setBookingState({
      ...bookingState,
      currentBooking: {
        ...bookingState.currentBooking,
        scheduledDate: date,
        scheduledTime: time,
      },
    });
  };

  const setPaymentMethod = (method: PaymentMethod) => {
    setBookingState({
      ...bookingState,
      currentBooking: {
        ...bookingState.currentBooking,
        paymentMethod: method,
      },
    });
  };

  const confirmBooking = async (): Promise<Booking> => {
    if (!bookingState.currentBooking) {
      throw new Error('No booking to confirm');
    }

    setBookingState({ ...bookingState, isLoading: true, error: null });
    
    try {
      const bookingData = {
        ...bookingState.currentBooking,
        status: BookingStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
      };
      
      const newBooking = await bookingAPI.create(bookingData);
      
      setBookingState({
        ...bookingState,
        bookings: [...bookingState.bookings, newBooking],
        currentBooking: null,
        isLoading: false,
        error: null,
        step: 1,
      });
      
      return newBooking;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create booking';
      setBookingState({
        ...bookingState,
        isLoading: false,
        error: errorMessage,
      });
      throw new Error(errorMessage);
    }
  };

  const cancelBooking = async (bookingId: string, reason?: string) => {
    setBookingState({ ...bookingState, isLoading: true, error: null });
    
    try {
      await bookingAPI.cancel(bookingId, reason);
      
      const updatedBookings = bookingState.bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: BookingStatus.CANCELLED }
          : booking
      );
      
      setBookingState({
        ...bookingState,
        bookings: updatedBookings,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to cancel booking';
      setBookingState({
        ...bookingState,
        isLoading: false,
        error: errorMessage,
      });
      throw new Error(errorMessage);
    }
  };

  const loadUserBookings = async () => {
    setBookingState({ ...bookingState, isLoading: true, error: null });
    
    try {
      const bookings = await bookingAPI.getUserBookings();
      setBookingState({
        ...bookingState,
        bookings,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to load bookings';
      setBookingState({
        ...bookingState,
        isLoading: false,
        error: errorMessage,
      });
    }
  };

  const clearCurrentBooking = () => {
    setBookingState({
      ...bookingState,
      currentBooking: null,
      step: 1,
      error: null,
    });
  };

  const nextStep = () => {
    setBookingState({
      ...bookingState,
      step: bookingState.step + 1,
    });
  };

  const previousStep = () => {
    setBookingState({
      ...bookingState,
      step: Math.max(1, bookingState.step - 1),
    });
  };

  const goToStep = (step: number) => {
    setBookingState({
      ...bookingState,
      step,
    });
  };

  const value: BookingContextType = {
    ...bookingState,
    selectService,
    setBookingDetails,
    setAddress,
    setSchedule,
    setPaymentMethod,
    confirmBooking,
    cancelBooking,
    loadUserBookings,
    clearCurrentBooking,
    nextStep,
    previousStep,
    goToStep,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};
