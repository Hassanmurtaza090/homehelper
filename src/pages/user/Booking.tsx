import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Loader } from '@/components/ui/Loader';
import { getServiceById, getProviderById } from '@/data/mockData';
import { ROUTES } from '@/utils/constants';
import { Calendar, Clock, CreditCard, DollarSign, CheckCircle } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface BookingFormData {
  serviceDate: string;
  serviceTime: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  specialInstructions: string;
  contactPhone: string;
  paymentMethod: 'online' | 'onspot';
}

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isInstantBooking, setIsInstantBooking] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    serviceDate: '',
    serviceTime: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    specialInstructions: '',
    contactPhone: '',
    paymentMethod: 'online'
  });

  const serviceId = searchParams.get('service');
  const providerId = searchParams.get('provider');

  useEffect(() => {
    if (serviceId && providerId) {
      const serviceData = getServiceById(serviceId);
      const providerData = getProviderById(providerId);
      
      if (serviceData && providerData) {
        setService(serviceData);
        setProvider(providerData);
        
        // Set default date to tomorrow
        const tomorrow = addDays(new Date(), 1);
        setFormData(prev => ({
          ...prev,
          serviceDate: format(tomorrow, 'yyyy-MM-dd')
        }));
      }
      setLoading(false);
    }
  }, [serviceId, providerId]);

  const generateTimeSlots = (date: string) => {
    const slots = [];
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();
    
    // Check if provider is available on this day
    const availability = provider?.availability?.find((av: any) => av.dayOfWeek === dayOfWeek);
    if (!availability?.isAvailable) return [];

    const startHour = parseInt(availability.startTime.split(':')[0]);
    const endHour = parseInt(availability.endTime.split(':')[0]);

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }

    return slots;
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingSubmit = () => {
    console.log('Booking submitted:', {
      service,
      provider,
      formData,
      isInstantBooking
    });
    
    alert('Booking submitted successfully! You will receive a confirmation email shortly.');
    navigate(ROUTES.USER_MY_BOOKINGS);
  };

  const formatPrice = (price: number, unit: string) => {
    const symbol = unit === 'hour' ? '/hr' : unit === 'sqft' ? '/sqft' : '';
    return `$${price}${symbol}`;
  };

  const timeSlots = formData.serviceDate ? generateTimeSlots(formData.serviceDate) : [];

  if (loading) {
    return <Loader />;
  }

  if (!service || !provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h2>
            <p className="text-gray-600 mb-6">The service or provider you're trying to book doesn't exist.</p>
            <Button onClick={() => navigate(ROUTES.USER_SERVICES)}>
              Browse Services
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Service</h1>
          <p className="text-lg text-gray-600">Complete your booking details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Booking Details</CardTitle>
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step <= currentStep
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
                      
                      <div className="mb-6">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isInstantBooking}
                            onChange={(e) => setIsInstantBooking(e.target.checked)}
                            className="w-5 h-5 text-primary"
                          />
                          <div>
                            <div className="font-medium">Instant Booking</div>
                            <div className="text-sm text-gray-600">
                              Book immediately if provider is available now
                            </div>
                          </div>
                        </label>
                      </div>

                      {!isInstantBooking && (
                        <>
                          <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                              Service Date
                            </label>
                            <Input
                              type="date"
                              value={formData.serviceDate}
                              onChange={(e) => handleInputChange('serviceDate', e.target.value)}
                              min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                              max={format(addDays(new Date(), 30), 'yyyy-MM-dd')}
                            />
                          </div>

                          {formData.serviceDate && timeSlots.length > 0 && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Available Time Slots
                              </label>
                              <div className="grid grid-cols-4 gap-2">
                                {timeSlots.map((time) => (
                                  <button
                                    key={time}
                                    onClick={() => handleInputChange('serviceTime', time)}
                                    className={`p-2 text-sm rounded-lg border transition-colors ${
                                      formData.serviceTime === time
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-gray-300'
                                    }`}
                                  >
                                    {time}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {formData.serviceDate && timeSlots.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                              <Calendar className="w-12 h-12 mx-auto mb-2" />
                              <p>No available time slots for this date.</p>
                              <p className="text-sm">Please select a different date.</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Service Address & Details</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street Address *
                          </label>
                          <Input
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="123 Main Street"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Phone *
                          </label>
                          <Input
                            value={formData.contactPhone}
                            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <Input
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="New York"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State *
                          </label>
                          <Input
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            placeholder="NY"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code *
                          </label>
                          <Input
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            placeholder="10001"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Special Instructions
                        </label>
                        <Textarea
                          value={formData.specialInstructions}
                          onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                          placeholder="Any special requirements or instructions for the service provider..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                      
                      <div className="space-y-4">
                        <label className="flex items-center space-x-3 cursor-pointer p-4 border rounded-lg ">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="online"
                            checked={formData.paymentMethod === 'online'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            className="w-5 h-5 text-primary"
                          />
                          <div className="flex items-center">
                            <CreditCard className="w-6 h-6 mr-3 text-primary" />
                            <div>
                              <div className="font-medium">Pay Online</div>
                              <div className="text-sm text-gray-600">
                                Secure payment via credit card or digital wallet
                              </div>
                            </div>
                          </div>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer p-4 border rounded-lg ">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="onspot"
                            checked={formData.paymentMethod === 'onspot'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            className="w-5 h-5 text-primary"
                          />
                          <div className="flex items-center">
                            <DollarSign className="w-6 h-6 mr-3 text-primary" />
                            <div>
                              <div className="font-medium">Pay On-Spot</div>
                              <div className="text-sm text-gray-600">
                                Pay cash or card when the service is completed
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 3 ? (
                    <Button onClick={handleNextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button onClick={handleBookingSubmit}>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Complete Booking
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

                  <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                            <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      {Math.floor(service.duration / 60)}h {service.duration % 60}m
                    </div>
                    <div className="text-lg font-semibold text-primary">
                      {formatPrice(service.price, service.priceUnit)}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Service Provider</h4>
                    <div className="flex items-center space-x-3">
                      <img
                        src={provider.avatar}
                        alt={provider.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{provider.name}</div>
                              <div className="text-sm text-gray-600">
                          ⭐ {provider.rating} ({provider.totalReviews} reviews)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Booking Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span>{isInstantBooking ? 'Now' : formData.serviceDate || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span>{isInstantBooking ? 'Immediate' : formData.serviceTime || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment:</span>
                        <span className="capitalize">{formData.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-primary">{formatPrice(service.price, service.priceUnit)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
