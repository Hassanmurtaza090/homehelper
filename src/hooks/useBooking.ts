import { useContext } from 'react';
import { BookingContext } from '@/context/BookingContext';
import { BookingStatus } from '@/types/booking';

export const useBooking = () => {
  const context = useContext(BookingContext);
  
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  
  // Helper functions
  const hasActiveBooking = (): boolean => {
    return context.currentBooking !== null;
  };
  
  const getBookingsByStatus = (status: BookingStatus) => {
    return context.bookings.filter(booking => booking.status === status);
  };
  
  const getUpcomingBookings = () => {
    const now = new Date();
    return context.bookings.filter(booking => {
      const bookingDate = new Date(booking.scheduledDate);
      return bookingDate > now && booking.status !== BookingStatus.CANCELLED;
    });
  };
  
  const getPastBookings = () => {
    const now = new Date();
    return context.bookings.filter(booking => {
      const bookingDate = new Date(booking.scheduledDate);
      return bookingDate <= now || booking.status === BookingStatus.COMPLETED;
    });
  };
  
  const canProceedToNextStep = (): boolean => {
    const { currentBooking, step } = context;
    
    if (!currentBooking) return false;
    
    switch (step) {
      case 1: // Service selection
        return !!currentBooking.serviceId;
      case 2: // Schedule selection
        return !!currentBooking.scheduledDate && !!currentBooking.scheduledTime;
      case 3: // Address input
        return !!currentBooking.address;
      case 4: // Payment method
        return !!currentBooking.paymentMethod;
      default:
        return false;
    }
  };
  
  return {
    ...context,
    hasActiveBooking,
    getBookingsByStatus,
    getUpcomingBookings,
    getPastBookings,
    canProceedToNextStep,
  };
};
