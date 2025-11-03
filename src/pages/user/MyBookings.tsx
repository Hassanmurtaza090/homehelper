import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { BookingStatus, PaymentStatus } from '@/types/booking';
import { formatDate, formatTime, formatCurrency } from '@/utils/helpers';

// Mock booking data - in a real app, this would come from an API
const mockBookings = [
  {
    id: 'BK001',
    service: {
      id: 'SV001',
      name: 'Deep House Cleaning',
      category: 'cleaning',
      description: 'Complete deep cleaning of your home',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    provider: {
      id: 'PR001',
      name: 'Maria Rodriguez',
      rating: 4.8,
      avatar: 'https://ui-avatars.com/api/?name=Maria+Rodriguez&background=random'
    },
    status: BookingStatus.CONFIRMED,
    paymentStatus: PaymentStatus.PAID,
    scheduledDate: new Date('2024-12-15'),
    scheduledTime: '10:00',
    duration: 180,
    price: 150,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    notes: 'Please focus on the kitchen and bathrooms',
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: 'BK002',
    service: {
      id: 'SV002',
      name: 'Plumbing Repair',
      category: 'plumbing',
      description: 'Fix leaky faucet and check pipes',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop'
    },
    provider: {
      id: 'PR002',
      name: 'John Smith',
      rating: 4.9,
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random'
    },
    status: BookingStatus.IN_PROGRESS,
    paymentStatus: PaymentStatus.PAID,
    scheduledDate: new Date('2024-12-12'),
    scheduledTime: '14:00',
    duration: 120,
    price: 200,
    address: {
      street: '456 Oak Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'USA'
    },
    notes: 'Kitchen sink is leaking badly',
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-12-12')
  },
  {
    id: 'BK003',
    service: {
      id: 'SV003',
      name: 'Electrical Installation',
      category: 'electrical',
      description: 'Install new ceiling fan',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop'
    },
    provider: {
      id: 'PR003',
      name: 'Sarah Johnson',
      rating: 4.7,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random'
    },
    status: BookingStatus.COMPLETED,
    paymentStatus: PaymentStatus.PAID,
    scheduledDate: new Date('2024-11-25'),
    scheduledTime: '09:00',
    duration: 90,
    price: 180,
    address: {
      street: '789 Pine St',
      city: 'New York',
      state: 'NY',
      zipCode: '10003',
      country: 'USA'
    },
    notes: 'Living room ceiling fan installation',
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-11-25')
  },
  {
    id: 'BK004',
    service: {
      id: 'SV004',
      name: 'Garden Maintenance',
      category: 'gardening',
      description: 'Monthly garden cleanup and maintenance',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
    },
    provider: {
      id: 'PR004',
      name: 'Mike Wilson',
      rating: 4.6,
      avatar: 'https://ui-avatars.com/api/?name=Mike+Wilson&background=random'
    },
    status: BookingStatus.CANCELLED,
    paymentStatus: PaymentStatus.REFUNDED,
    scheduledDate: new Date('2024-12-20'),
    scheduledTime: '08:00',
    duration: 240,
    price: 120,
    address: {
      street: '321 Elm St',
      city: 'New York',
      state: 'NY',
      zipCode: '10004',
      country: 'USA'
    },
    notes: 'Trim hedges and clean flower beds',
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-12-05')
  }
];

const MyBookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter bookings based on active tab and search term
  const filteredBookings = useMemo(() => {
    let filtered = mockBookings;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(booking => {
        switch (activeTab) {
          case 'upcoming':
            return booking.status === BookingStatus.CONFIRMED || booking.status === BookingStatus.PENDING;
          case 'completed':
            return booking.status === BookingStatus.COMPLETED;
          case 'cancelled':
            return booking.status === BookingStatus.CANCELLED;
          default:
            return true;
        }
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime());
  }, [activeTab, searchTerm]);

  const getStatusBadge = (status: BookingStatus) => {
    const statusConfig = {
      [BookingStatus.PENDING]: { color: 'yellow', label: 'Pending' },
      [BookingStatus.CONFIRMED]: { color: 'blue', label: 'Confirmed' },
      [BookingStatus.IN_PROGRESS]: { color: 'indigo', label: 'In Progress' },
      [BookingStatus.COMPLETED]: { color: 'green', label: 'Completed' },
      [BookingStatus.CANCELLED]: { color: 'red', label: 'Cancelled' },
      [BookingStatus.REFUNDED]: { color: 'gray', label: 'Refunded' }
    };

    const config = statusConfig[status];
    return <Badge variant={config.color as any}>{config.label}</Badge>;
  };

  const getPaymentBadge = (status: PaymentStatus) => {
    const statusConfig = {
      [PaymentStatus.PENDING]: { color: 'yellow', label: 'Payment Pending' },
      [PaymentStatus.PAID]: { color: 'green', label: 'Paid' },
      [PaymentStatus.FAILED]: { color: 'red', label: 'Payment Failed' },
      [PaymentStatus.REFUNDED]: { color: 'gray', label: 'Refunded' }
    };

    const config = statusConfig[status];
    return <Badge variant={config.color as any} size="sm">{config.label}</Badge>;
  };

  const handleCancelBooking = (booking: any) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const confirmCancelBooking = () => {
    // In a real app, this would make an API call
    console.log('Cancelling booking:', selectedBooking?.id);
    setShowCancelModal(false);
    setSelectedBooking(null);
    // You would update the booking status here
  };

  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'upcoming':
        return mockBookings.filter(b => b.status === BookingStatus.CONFIRMED || b.status === BookingStatus.PENDING).length;
      case 'completed':
        return mockBookings.filter(b => b.status === BookingStatus.COMPLETED).length;
      case 'cancelled':
        return mockBookings.filter(b => b.status === BookingStatus.CANCELLED).length;
      default:
        return mockBookings.length;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
              <p className="text-gray-600 mt-1">Track and manage all your service bookings</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'all', label: 'All Bookings' },
                { key: 'upcoming', label: 'Upcoming' },
                { key: 'completed', label: 'Completed' },
                { key: 'cancelled', label: 'Cancelled' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    activeTab === tab.key
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getTabCount(tab.key)}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="grid gap-6">
            {filteredBookings.map((booking) => (
              <Card 
                key={booking.id} 
                className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200 animate-fade-in-up"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Left Section - Service Info */}
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        <img
                          src={booking.service.image}
                          alt={booking.service.name}
                          className="w-16 h-16 rounded-lg object-cover shadow-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {booking.service.name}
                          </h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {booking.provider.name}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {booking.provider.rating}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {booking.duration} min
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                            </svg>
                            {formatDate(booking.scheduledDate)} at {formatTime(booking.scheduledTime)}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {booking.address.city}, {booking.address.state}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Price and Actions */}
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-end space-y-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(booking.price)}
                        </div>
                        {getPaymentBadge(booking.paymentStatus)}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedBooking(booking)}
                          className="hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
                        >
                          View Details
                        </Button>
                        
                        {booking.status === BookingStatus.CONFIRMED && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelBooking(booking)}
                            className="text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
                          >
                            Cancel
                          </Button>
                        )}
                        
                        {booking.status === BookingStatus.COMPLETED && (
                          <Button
                            variant="primary"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 transition-colors duration-200"
                          >
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'No bookings match your search criteria.' : 'You haven\'t made any bookings yet.'}
            </p>
            <Button variant="primary" className="bg-blue-600 hover:bg-blue-700">
              Browse Services
            </Button>
          </div>
        )}

        {/* Cancel Booking Modal */}
        {showCancelModal && selectedBooking && (
          <Modal
            isOpen={showCancelModal}
            onClose={() => setShowCancelModal(false)}
            title="Cancel Booking"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Cancel "{selectedBooking.service.name}"?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to cancel this booking? This action cannot be undone.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">
                      <p><strong>Service:</strong> {selectedBooking.service.name}</p>
                      <p><strong>Provider:</strong> {selectedBooking.provider.name}</p>
                      <p><strong>Date:</strong> {formatDate(selectedBooking.scheduledDate)} at {formatTime(selectedBooking.scheduledTime)}</p>
                      <p><strong>Amount:</strong> {formatCurrency(selectedBooking.price)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelModal(false)}
                >
                  Keep Booking
                </Button>
                <Button
                  variant="primary"
                  onClick={confirmCancelBooking}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Cancel Booking
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `
      }} />
    </div>
  );
};

export default MyBookings;
