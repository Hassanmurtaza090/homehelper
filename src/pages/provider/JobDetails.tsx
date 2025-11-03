import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProviderSidebar } from '@/components/layout/Sidebar';
import { mockProviderJobs } from '@/data/providerMockData';
import { BookingStatus, PaymentStatus } from '@/types/booking';
import { formatDate, formatTime, formatCurrency, formatPhoneNumber } from '@/utils/helpers';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // For demo purposes, we'll use the first job if no ID is provided
  const job = mockProviderJobs.find(job => job.id === id) || mockProviderJobs[0];
  
  const [status, setStatus] = useState(job.status);
  const [notes, setNotes] = useState('');
  
  // Handle status change
  const handleStatusChange = (newStatus: BookingStatus) => {
    // Here you would typically send the update to your backend
    console.log(`Updating job ${job.id} status from ${status} to ${newStatus}`);
    setStatus(newStatus);
  };
  
  // Handle adding notes
  const handleAddNotes = () => {
    if (notes.trim()) {
      console.log(`Adding notes to job ${job.id}:`, notes);
      // Clear the notes input after submission
      setNotes('');
    }
  };
  
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
        <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Job Details</h1>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(status)}`}>
              {status}
            </span>
          </div>
          <p className="text-gray-600 mt-1">Booking #{job.id}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Service Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mr-4">
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
                <div>
                  <h3 className="font-medium text-gray-900">{job.service.name}</h3>
                  <p className="text-sm text-gray-500">{job.service.category}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Price:</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(job.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Duration:</span>
                  <span className="text-sm font-medium text-gray-900">{job.duration} minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Schedule Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">{formatDate(job.scheduledDate)}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">{formatTime(job.scheduledTime)}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Address</h4>
                  <p className="text-sm text-gray-900">{job.address.street}</p>
                  <p className="text-sm text-gray-900">{job.address.city}, {job.address.state} {job.address.zipCode}</p>
                  <p className="text-sm text-gray-900">{job.address.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Customer Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-medium">{job.user.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{job.user.name}</h3>
                  <p className="text-sm text-gray-500">{job.user.email}</p>
                </div>
              </div>
              
              {job.user.phone && (
                <div className="flex items-center mt-2">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm text-gray-900">{formatPhoneNumber(job.user.phone)}</span>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Payment Details</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Method:</span>
                    <span className="text-sm font-medium text-gray-900">{job.paymentMethod.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className={`text-sm font-medium ${
                      job.paymentStatus === PaymentStatus.PAID ? 'text-green-600' : 
                      job.paymentStatus === PaymentStatus.PENDING ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {job.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Amount:</span>
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(job.price)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Job Details & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{job.service.description}</p>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {job.service.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
              
              {job.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Notes</h4>
                  <p className="text-sm text-gray-700">{job.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Job Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Job Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Booking Created</h4>
                    <p className="text-xs text-gray-500">{formatDate(job.createdAt)}</p>
                    <p className="text-sm text-gray-700 mt-1">Customer booked {job.service.name}</p>
                  </div>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Booking Confirmed</h4>
                    <p className="text-xs text-gray-500">{formatDate(new Date(job.updatedAt.getTime() - 86400000))}</p>
                    <p className="text-sm text-gray-700 mt-1">Service provider accepted the booking</p>
                  </div>
                </div>
                
                {status === BookingStatus.IN_PROGRESS && (
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Service In Progress</h4>
                      <p className="text-xs text-gray-500">{formatDate(new Date())}</p>
                      <p className="text-sm text-gray-700 mt-1">Provider started working on the job</p>
                    </div>
                  </div>
                )}
                
                {status === BookingStatus.COMPLETED && (
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Service Completed</h4>
                      <p className="text-xs text-gray-500">{formatDate(job.updatedAt)}</p>
                      <p className="text-sm text-gray-700 mt-1">Job was completed successfully</p>
                    </div>
                  </div>
                )}
                
                {status === BookingStatus.CANCELLED && (
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Booking Cancelled</h4>
                      <p className="text-xs text-gray-500">{formatDate(job.updatedAt)}</p>
                      <p className="text-sm text-gray-700 mt-1">Customer cancelled the booking</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Action Section */}
        <Card>
          <CardHeader>
            <CardTitle>Job Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Status Update */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Update Job Status</h4>
                <div className="flex flex-wrap gap-2">
                  {status === BookingStatus.PENDING && (
                    <button 
                      onClick={() => handleStatusChange(BookingStatus.CONFIRMED)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Confirm Job
                    </button>
                  )}
                  
                  {(status === BookingStatus.CONFIRMED || status === BookingStatus.PENDING) && (
                    <button 
                      onClick={() => handleStatusChange(BookingStatus.IN_PROGRESS)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Start Job
                    </button>
                  )}
                  
                  {status === BookingStatus.IN_PROGRESS && (
                    <button 
                      onClick={() => handleStatusChange(BookingStatus.COMPLETED)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Complete Job
                    </button>
                  )}
                  
                  {(status === BookingStatus.PENDING || status === BookingStatus.CONFIRMED) && (
                    <button 
                      onClick={() => handleStatusChange(BookingStatus.CANCELLED)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Cancel Job
                    </button>
                  )}
                </div>
              </div>
              
              {/* Add Notes */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Add Notes</h4>
                <div className="space-y-3">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Add notes about this job..."
                  />
                  <button
                    onClick={handleAddNotes}
                    disabled={!notes.trim()}
                    className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Note
                  </button>
                </div>
              </div>
              
              {/* Contact Customer */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Contact Customer</h4>
                <div className="flex space-x-3">
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </button>
                  {job.user.phone && (
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call
                    </button>
                  )}
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Message
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;