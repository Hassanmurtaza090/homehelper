import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '@/components/layout/Sidebar';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';
import { formatCurrency, formatDate } from '@/utils/validators';

// Mock data for demonstration
const recentUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: new Date('2024-12-01') },
  { id: '2', name: 'Jane Provider', email: 'jane@example.com', role: 'provider', status: 'active', joinDate: new Date('2024-12-05') },
  { id: '3', name: 'Mike Customer', email: 'mike@example.com', role: 'user', status: 'pending', joinDate: new Date('2024-12-10') },
];

const recentBookings = [
  { id: '1', customer: 'John Doe', service: 'Home Cleaning', amount: 150, status: 'completed', date: new Date('2024-12-10') },
  { id: '2', customer: 'Sarah Smith', service: 'Plumbing', amount: 200, status: 'in_progress', date: new Date('2024-12-11') },
  { id: '3', customer: 'Mike Johnson', service: 'Electrical', amount: 180, status: 'pending', date: new Date('2024-12-12') },
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userColumns = [
    { key: 'name', header: 'Name', accessor: 'name' as any },
    { key: 'email', header: 'Email', accessor: 'email' as any },
    {
      key: 'role',
      header: 'Role',
      accessor: (row: any) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize
          ${row.role === 'admin' && 'bg-purple-100 text-purple-800'}
          ${row.role === 'provider' && 'bg-blue-100 text-blue-800'}
          ${row.role === 'user' && 'bg-green-100 text-green-800'}
        `}>
          {row.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row: any) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full
          ${row.status === 'active' && 'bg-green-100 text-green-800'}
          ${row.status === 'pending' && 'bg-yellow-100 text-yellow-800'}
          ${row.status === 'inactive' && 'bg-gray-100 text-gray-800'}
        `}>
          {row.status}
        </span>
      ),
    },
    { key: 'joinDate', header: 'Join Date', accessor: (row: any) => formatDate(row.joinDate) },
  ];

  const bookingColumns = [
    { key: 'customer', header: 'Customer', accessor: 'customer' as any },
    { key: 'service', header: 'Service', accessor: 'service' as any },
    { key: 'amount', header: 'Amount', accessor: (row: any) => formatCurrency(row.amount) },
    {
      key: 'status',
      header: 'Status',
      accessor: (row: any) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full
          ${row.status === 'completed' && 'bg-green-100 text-green-800'}
          ${row.status === 'in_progress' && 'bg-blue-100 text-blue-800'}
          ${row.status === 'pending' && 'bg-yellow-100 text-yellow-800'}
          ${row.status === 'cancelled' && 'bg-red-100 text-red-800'}
        `}>
          {row.status.replace('_', ' ')}
        </span>
      ),
    },
    { key: 'date', header: 'Date', accessor: (row: any) => formatDate(row.date) },
  ];

  // Chart data for revenue
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  }
                >
                  <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value="1,234"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
              trend={{ value: 12, isPositive: true }}
              description="vs last month"
              color="primary"
            />
            
            <StatCard
              title="Total Revenue"
              value="$123,456"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              trend={{ value: 18, isPositive: true }}
              description="vs last month"
              color="success"
            />
            
            <StatCard
              title="Active Services"
              value="156"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
              trend={{ value: 5, isPositive: false }}
              description="vs last month"
              color="accent"
            />
            
            <StatCard
              title="Total Bookings"
              value="8,567"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              trend={{ value: 25, isPositive: true }}
              description="vs last month"
              color="secondary"
            />
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <Button size="sm" variant="ghost">View Report</Button>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Revenue chart visualization would go here</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Today</p>
                    <p className="text-lg font-semibold">$4,250</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">This Week</p>
                    <p className="text-lg font-semibold">$28,450</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">This Month</p>
                    <p className="text-lg font-semibold">$123,456</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Service Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Service Distribution</CardTitle>
                <Button size="sm" variant="ghost">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Cleaning', bookings: 2834, percentage: 35, color: 'bg-blue-500' },
                    { name: 'Plumbing', bookings: 1876, percentage: 23, color: 'bg-green-500' },
                    { name: 'Electrical', bookings: 1544, percentage: 19, color: 'bg-yellow-500' },
                    { name: 'Painting', bookings: 1057, percentage: 13, color: 'bg-purple-500' },
                    { name: 'Others', bookings: 813, percentage: 10, color: 'bg-gray-500' },
                  ].map((service) => (
                    <div key={service.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{service.name}</span>
                        <span className="text-gray-500">{service.bookings} bookings</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${service.color}`}
                          style={{ width: `${service.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(ROUTES.ADMIN_USERS)}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table
                  columns={userColumns}
                  data={recentUsers}
                  compact
                  hover={false}
                />
              </CardContent>
            </Card>
            
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(ROUTES.ADMIN_BOOKINGS)}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table
                  columns={bookingColumns}
                  data={recentBookings}
                  compact
                  hover={false}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
