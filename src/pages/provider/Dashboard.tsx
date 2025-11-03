import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProviderSidebar } from '@/components/layout/Sidebar';
import { providerDashboardStats, mockProviderJobs } from '@/data/providerMockData';
import { BookingStatus } from '@/types/booking';
import { formatDate } from '@/utils/helpers';
import { useProvider } from '@/context/ProviderContext';
import { Loader } from '@/components/ui/Loader';

const Dashboard: React.FC = () => {
  const { providerProfile, isLoading } = useProvider();
  
  // Filter jobs by status
  const pendingJobs = mockProviderJobs.filter(job => 
    job.status === BookingStatus.PENDING || job.status === BookingStatus.CONFIRMED
  );
  const inProgressJobs = mockProviderJobs.filter(job => job.status === BookingStatus.IN_PROGRESS);
  const completedJobs = mockProviderJobs.filter(job => job.status === BookingStatus.COMPLETED);

  if (isLoading) {
    return <Loader fullScreen text="Loading dashboard..." />;
  }

  if (!providerProfile) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <ProviderSidebar />
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Provider Profile Not Found</h2>
              <p className="text-gray-600 mt-2">Please complete your profile setup to access the dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProviderSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {providerProfile.name}!</h1>
          <p className="text-gray-600 mt-1">
            {providerProfile.bio ? providerProfile.bio : 'Here\'s an overview of your services and performance'}
          </p>
          {providerProfile.servicesOffered.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {providerProfile.servicesOffered.map((service, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-900">${providerDashboardStats.totalEarnings}</p>
                <p className="ml-2 text-sm text-green-600">+12% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Jobs Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-900">{providerDashboardStats.jobsCompleted}</p>
                <p className="ml-2 text-sm text-green-600">+3 this month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-900">{providerDashboardStats.pendingJobs}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-900">{providerProfile.rating}</p>
                <div className="flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(providerProfile.rating) ? 'text-accent' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">({providerProfile.totalReviews} reviews)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly earnings chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <div className="flex h-full items-end space-x-2">
                {providerDashboardStats.monthlyStats.map((stat, index) => (
                  <div key={index} className="relative flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-gradient-to-t from-primary to-primary/80 rounded-t shadow-sm" 
                      style={{ 
                        height: `${(stat.earnings / providerDashboardStats.monthlyStats.reduce((max, s) => Math.max(max, s.earnings), 0)) * 100}%` 
                      }}
                    ></div>
                    <div className="absolute bottom-0 transform translate-y-full mt-2 text-xs font-medium">
                      {stat.month}
                    </div>
                    <div className="absolute bottom-0 transform -translate-y-full mb-1 text-xs font-medium">
                      ${stat.earnings}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingJobs.length > 0 ? (
                  pendingJobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="flex items-start p-4 border rounded-lg">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{job.service.name}</h3>
                        <p className="text-sm text-gray-500">{job.user.name} • {formatDate(job.scheduledDate)} at {job.scheduledTime}</p>
                        <div className="mt-1 flex items-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {job.status}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">${job.price}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No upcoming jobs</p>
                )}
                {pendingJobs.length > 3 && (
                  <div className="text-center">
                    <button className="text-primary text-sm font-medium hover:underline">
                      View all ({pendingJobs.length})
                    </button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {providerDashboardStats.recentActivity.map((activity, index) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center
                        ${activity.type === 'booking_confirmed' ? 'bg-green-100 text-green-600' : 
                          activity.type === 'job_completed' ? 'bg-blue-100 text-blue-600' : 
                          activity.type === 'review_received' ? 'bg-yellow-100 text-yellow-600' : 
                          activity.type === 'payment_received' ? 'bg-purple-100 text-purple-600' : 
                          'bg-gray-100 text-gray-600'}`}
                      >
                        {activity.type === 'booking_confirmed' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {activity.type === 'job_completed' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        )}
                        {activity.type === 'review_received' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        )}
                        {activity.type === 'payment_received' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {activity.type === 'booking_request' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{formatTimeAgo(activity.time)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format date to relative time
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
}

export default Dashboard;