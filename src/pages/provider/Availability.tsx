import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProviderSidebar } from '@/components/layout/Sidebar';
import { mockProviderProfile, weekDays } from '@/data/providerMockData';
import { Availability as AvailabilityType } from '@/types/user';
import { getDayName, formatTime } from '@/utils/helpers';

const Availability: React.FC = () => {
  const [availability, setAvailability] = useState<AvailabilityType[]>([...mockProviderProfile.availability]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Handle availability toggle
  const handleAvailabilityToggle = (dayOfWeek: number) => {
    setAvailability(prev => 
      prev.map(day => 
        day.dayOfWeek === dayOfWeek 
          ? { ...day, isAvailable: !day.isAvailable }
          : day
      )
    );
  };
  
  // Handle time change
  const handleTimeChange = (dayOfWeek: number, field: 'startTime' | 'endTime', value: string) => {
    setAvailability(prev => 
      prev.map(day => 
        day.dayOfWeek === dayOfWeek 
          ? { ...day, [field]: value }
          : day
      )
    );
  };
  
  // Save changes
  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log('Saving availability:', availability);
    setIsEditing(false);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProviderSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Availability</h1>
          <p className="text-gray-600 mt-1">Set your working hours and availability</p>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Weekly Schedule</CardTitle>
            <div>
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Edit Schedule
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availability.map((day) => (
                <div key={day.dayOfWeek} className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-gray-200 last:border-b-0">
                  <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                    <div className="flex items-center">
                      {isEditing && (
                        <input
                          type="checkbox"
                          id={`available-${day.dayOfWeek}`}
                          checked={day.isAvailable}
                          onChange={() => handleAvailabilityToggle(day.dayOfWeek)}
                          className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mr-2"
                        />
                      )}
                      <label 
                        htmlFor={`available-${day.dayOfWeek}`}
                        className={`font-medium ${day.isAvailable ? 'text-gray-900' : 'text-gray-500'}`}
                      >
                        {getDayName(day.dayOfWeek)}
                      </label>
                    </div>
                  </div>
                  
                  {isEditing ? (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 sm:mt-0">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <label htmlFor={`start-time-${day.dayOfWeek}`} className="sr-only">Start Time</label>
                        <input
                          type="time"
                          id={`start-time-${day.dayOfWeek}`}
                          value={day.startTime}
                          onChange={(e) => handleTimeChange(day.dayOfWeek, 'startTime', e.target.value)}
                          disabled={!day.isAvailable}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:text-gray-400"
                        />
                      </div>
                      <span className="hidden sm:block text-gray-500">to</span>
                      <div className="flex items-center">
                        <label htmlFor={`end-time-${day.dayOfWeek}`} className="sr-only">End Time</label>
                        <input
                          type="time"
                          id={`end-time-${day.dayOfWeek}`}
                          value={day.endTime}
                          onChange={(e) => handleTimeChange(day.dayOfWeek, 'endTime', e.target.value)}
                          disabled={!day.isAvailable}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:text-gray-400"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-700">
                      {day.isAvailable ? (
                        <span>{formatTime(day.startTime)} - {formatTime(day.endTime)}</span>
                      ) : (
                        <span className="text-gray-500">Not Available</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">May 2025</h3>
                <div className="flex space-x-2">
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {/* Day names */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                  <div key={day} className="bg-gray-50 py-2 text-center text-xs font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {[...Array(35)].map((_, i) => {
                  const dayOfMonth = i - 3; // Start from previous month's days
                  const isCurrentMonth = dayOfMonth > 0 && dayOfMonth <= 31;
                  const dayOfWeek = i % 7;
                  
                  const dayAvailability = availability.find(a => a.dayOfWeek === dayOfWeek);
                  const isAvailable = isCurrentMonth && dayAvailability?.isAvailable;
                  
                  return (
                    <div 
                      key={i} 
                      className={`
                        bg-white p-2 min-h-[80px] border-t
                        ${isCurrentMonth ? '' : 'text-gray-400'}
                        ${dayOfWeek === 0 || dayOfWeek === 6 ? 'bg-gray-50' : ''}
                      `}
                    >
                      <div className="flex justify-between">
                        <span className={`text-sm ${isCurrentMonth ? 'font-medium' : ''}`}>
                          {isCurrentMonth ? dayOfMonth : dayOfMonth <= 0 ? 30 + dayOfMonth : dayOfMonth - 31}
                        </span>
                        {isAvailable && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Available
                          </span>
                        )}
                      </div>
                      
                      {isAvailable && (
                        <div className="mt-1 text-xs text-gray-500">
                          {formatTime(dayAvailability?.startTime || '09:00')} - {formatTime(dayAvailability?.endTime || '17:00')}
                        </div>
                      )}
                      
                      {/* Example booked job */}
                      {isCurrentMonth && dayOfMonth === 15 && (
                        <div className="mt-1 p-1 text-xs bg-blue-100 text-blue-800 rounded">
                          Plumbing Job - 2:00 PM
                        </div>
                      )}
                      
                      {isCurrentMonth && dayOfMonth === 22 && (
                        <div className="mt-1 p-1 text-xs bg-blue-100 text-blue-800 rounded">
                          Electrical Work - 10:00 AM
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>* Calendar shows your availability and booked jobs. Click on a day to see details.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Availability;