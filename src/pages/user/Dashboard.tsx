import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StatCard, MiniStatCard } from '@/components/shared/StatCard';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { Card, CardContent, CardHeader, CardTitle, CardActions } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';
import { BookingStatus, Booking } from '@/types/booking';
import { Service, ServiceCategory } from '@/types/service';
import { formatDate, formatCurrency } from '@/utils/validators';

// Mock data
const mockBookings: Partial<Booking>[] = [
  {
    id: '1',
    service: {
      id: '1',
      name: 'Home Deep Cleaning',
      category: ServiceCategory.CLEANING,
      price: 150,
    } as Service,
    status: BookingStatus.CONFIRMED,
    scheduledDate: new Date('2024-12-15'),
    scheduledTime: '10:00 AM',
    price: 150,
  },
  {
    id: '2',
    service: {
      id: '2',
      name: 'Plumbing Repair',
      category: ServiceCategory.PLUMBING,
      price: 80,
    } as Service,
    status: BookingStatus.COMPLETED,
    scheduledDate: new Date('2024-12-10'),
    scheduledTime: '2:00 PM',
    price: 160,
  },
];

const recommendedServices: Service[] = [
  {
    id: '4',
    name: 'AC Maintenance',
    description: 'Keep your AC running smoothly',
    category: ServiceCategory.ELECTRICAL,
    price: 120,
    priceUnit: 'fixed',
    duration: 90,
    image: 'https://images.unsplash.com/photo-1565538420870-da08ff96a207?w=400',
    rating: 4.7,
    totalReviews: 98,
    features: ['Certified technicians', 'Warranty included'],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Garden Maintenance',
    description: 'Professional gardening services',
    category: ServiceCategory.GARDENING,
    price: 60,
    priceUnit: 'hour',
    duration: 120,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    rating: 4.5,
    totalReviews: 67,
    features: ['Eco-friendly', 'Weekly/Monthly plans'],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const bookingColumns = [
    {
      key: 'service',
      header: 'Service',
      accessor: (row: any) => row.service?.name || 'N/A',
    },
    {
      key: 'date',
      header: 'Date',
      accessor: (row: any) => formatDate(row.scheduledDate),
    },
    {
      key: 'time',
      header: 'Time',
      accessor: 'scheduledTime' as any,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row: any) => (
        <span className={`
          px-2 py-1 text-xs font-medium rounded-full
          ${row.status === BookingStatus.CONFIRMED && 'bg-blue-100 text-blue-800'}
          ${row.status === BookingStatus.COMPLETED && 'bg-green-100 text-green-800'}
          ${row.status === BookingStatus.PENDING && 'bg-yellow-100 text-yellow-800'}
          ${row.status === BookingStatus.CANCELLED && 'bg-red-100 text-red-800'}
        `}>
          {row.status}
        </span>
      ),
    },
    {
      key: 'price',
      header: 'Amount',
      accessor: (row: any) => formatCurrency(row.price),
      align: 'right' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your home service activities
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Bookings"
            value="12"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            trend={{ value: 20, isPositive: true }}
            description="vs last month"
            color="primary"
          />
          
          <StatCard
            title="Active Bookings"
            value="2"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            color="secondary"
          />
          
          <StatCard
            title="Total Spent"
            value="$1,850"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            trend={{ value: 15, isPositive: false }}
            description="vs last month"
            color="accent"
          />
          
          <StatCard
            title="Loyalty Points"
            value="450"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            }
            color="success"
          />
        </div>
        
        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate(ROUTES.USER_SERVICES)}
                className="h-auto py-4 flex-col"
              >
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Services
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate(ROUTES.USER_MY_BOOKINGS)}
                className="h-auto py-4 flex-col"
              >
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                My Bookings
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate(ROUTES.USER_PROFILE)}
                className="h-auto py-4 flex-col"
              >
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate(ROUTES.CONTACT)}
                className="h-auto py-4 flex-col"
              >
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Get Support
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => navigate(ROUTES.USER_MY_BOOKINGS)}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table
                columns={bookingColumns}
                data={mockBookings}
                compact
                hover={false}
              />
            </CardContent>
          </Card>
          
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBookings
                  .filter(b => b.status === BookingStatus.CONFIRMED)
                  .map((booking) => (
                    <div key={booking.id} className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                    <h4 className="font-semibold text-gray-900">{booking.service?.name}</h4>
                    <p className="text-sm text-gray-600">
                          {formatDate(booking.scheduledDate!)} at {booking.scheduledTime}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  ))}
                
                {mockBookings.filter(b => b.status === BookingStatus.CONFIRMED).length === 0 && (
                  <p className="text-center text-gray-500 py-8">No upcoming appointments</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recommended Services */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
            <Button
              variant="ghost"
              onClick={() => navigate(ROUTES.USER_SERVICES)}
            >
              See More
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
