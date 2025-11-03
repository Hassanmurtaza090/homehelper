import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProviderSidebar } from '@/components/layout/Sidebar';
import { mockProviderJobs } from '@/data/providerMockData';
import { BookingStatus } from '@/types/booking';
import { formatDate, formatTime, formatCurrency } from '@/utils/helpers';

const MyJobs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'inProgress' | 'completed' | 'cancelled'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter jobs based on status and search term
  const filteredJobs = mockProviderJobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.address.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (activeTab) {
      case 'upcoming':
        return job.status === BookingStatus.PENDING || job.status === BookingStatus.CONFIRMED;
      case 'inProgress':
        return job.status === BookingStatus.IN_PROGRESS;
      case 'completed':
        return job.status === BookingStatus.COMPLETED;
      case 'cancelled':
        return job.status === BookingStatus.CANCELLED || job.status === BookingStatus.REFUNDED;
      default:
        return true;
    }
  });
  
  // Get status badge color
  const getStatusBadgeClass = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case BookingStatus.CONFIRMED:
        return 'bg-blue-100 text-blue-800';
      case BookingStatus.IN_PROGRESS:
        return 'bg-indigo-100 text-indigo-800';
      case BookingStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case BookingStatus.CANCELLED:
      case BookingStatus.REFUNDED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProviderSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>
          <p className="text-gray-600 mt-1">View and manage your assigned jobs</p>
        </div>
        
        <Card>
          <CardHeader className="border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <CardTitle>Job Listings</CardTitle>
              <div className="mt-4 md:mt-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                  activeTab === 'upcoming' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming
                <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                  {mockProviderJobs.filter(job => 
                    job.status === BookingStatus.PENDING || job.status === BookingStatus.CONFIRMED
                  ).length}
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('inProgress')}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                  activeTab === 'inProgress' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                In Progress
                <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                  {mockProviderJobs.filter(job => job.status === BookingStatus.IN_PROGRESS).length}
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                  activeTab === 'completed' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Completed
                <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                  {mockProviderJobs.filter(job => job.status === BookingStatus.COMPLETED).length}
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                  activeTab === 'cancelled' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Cancelled
                <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                  {mockProviderJobs.filter(job => 
                    job.status === BookingStatus.CANCELLED || job.status === BookingStatus.REFUNDED
                  ).length}
                </span>
              </button>
            </div>
          </div>
          
          <CardContent className="p-0">
            {filteredJobs.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="p-6 hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                              {job.service.category === 'plumbing' ? (
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                                </svg>
                              ) : job.service.category === 'electrical' ? (
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              ) : (
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg font-medium text-gray-900">{job.service.name}</h4>
                            <div className="flex items-center mt-1">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(job.status)}`}>
                                {job.status}
                              </span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-500">{formatDate(job.scheduledDate)} at {formatTime(job.scheduledTime)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h5 className="text-xs font-medium text-gray-500 uppercase">Client</h5>
                            <p className="mt-1 text-sm text-gray-900">{job.user.name}</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-gray-500 uppercase">Location</h5>
                            <p className="mt-1 text-sm text-gray-900">{job.address.city}, {job.address.state}</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-gray-500 uppercase">Payment</h5>
                            <p className="mt-1 text-sm text-gray-900">{formatCurrency(job.price)} ({job.paymentStatus})</p>
                          </div>
                        </div>
                        
                        {job.notes && (
                          <div className="mt-4">
                            <h5 className="text-xs font-medium text-gray-500 uppercase">Notes</h5>
                            <p className="mt-1 text-sm text-gray-900">{job.notes}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col md:items-end">
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            View Details
                          </button>
                          
                          {(job.status === BookingStatus.CONFIRMED || job.status === BookingStatus.PENDING) && (
                            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                              Start Job
                            </button>
                          )}
                          
                          {job.status === BookingStatus.IN_PROGRESS && (
                            <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                              Complete Job
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ? 'Try adjusting your search terms.' : 'You have no jobs in this category.'}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default MyJobs;