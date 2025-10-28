import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Loader } from '@/components/ui/Loader';
import { getServiceById, getProvidersByService, ServiceProvider } from '@/data/mockData';
import { ServiceCategory } from '@/types/service';
import { ROUTES } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';
import { Star, Clock, DollarSign, MapPin, Phone, Calendar, CheckCircle, Award, Shield, Users } from 'lucide-react';

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [service, setService] = useState<any>(null);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);

  useEffect(() => {
    if (id) {
      const serviceData = getServiceById(id);
      if (serviceData) {
        setService(serviceData);
        const availableProviders = getProvidersByService(serviceData.category);
        setProviders(availableProviders);
      }
      setLoading(false);
    }
  }, [id]);

  const handleProviderSelect = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
  };

  const handleBookService = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { state: { from: location.pathname } });
      return;
    }
    
    if (selectedProvider && service) {
      navigate(`${ROUTES.USER_BOOKING}?service=${service.id}&provider=${selectedProvider.id}`);
    }
  };

  const formatPrice = (price: number, unit: string) => {
    const symbol = unit === 'hour' ? '/hr' : unit === 'sqft' ? '/sqft' : '';
    return `$${price}${symbol}`;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}m`;
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Service Not Found</h2>
            <p className="text-gray-600 mb-8">The service you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate(ROUTES.USER_SERVICES)} size="lg" className="shadow-lg">
              Browse All Services
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Service Image */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-blue-100">
              <li>
                <button 
                  onClick={() => navigate(ROUTES.HOME)}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>/</li>
              <li>
                <button 
                  onClick={() => navigate(ROUTES.USER_SERVICES)}
                  className="hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>/</li>
              <li className="text-white font-medium">{service.name}</li>
            </ol>
          </nav>

          {/* Service Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="capitalize bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-1">
                  {service.category}
                </Badge>
                {service.verified && (
                  <Badge className="bg-green-500/20 backdrop-blur-sm text-green-100 border-green-400/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified Service
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{service.name}</h1>
              <p className="text-xl text-blue-50 mb-6 leading-relaxed max-w-3xl">{service.description}</p>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Star className="w-5 h-5 text-yellow-300 mr-2 fill-current" />
                  <span className="font-bold text-lg">{service.rating}</span>
                  <span className="text-blue-100 ml-2">({service.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5 text-blue-200 mr-2" />
                  <span className="font-semibold">{formatDuration(service.duration)}</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <DollarSign className="w-5 h-5 text-green-300 mr-2" />
                  <span className="font-bold text-lg">{formatPrice(service.price, service.priceUnit)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 w-full">
          <svg className="relative block w-full h-16" preserveAspectRatio="none" viewBox="0 0 1440 74">
            <path fill="rgb(249 250 251)" d="M0,32L48,37.3C96,43,192,53,288,56C384,59,480,53,576,48C672,43,768,37,864,37.3C960,37,1056,43,1152,45.3C1248,48,1344,48,1392,48L1440,48L1440,74L1392,74C1344,74,1248,74,1152,74C1056,74,960,74,864,74C768,74,672,74,576,74C480,74,384,74,288,74C192,74,96,74,48,74L0,74Z"></path>
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Service Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Image Gallery */}
            <Card className="overflow-hidden border-2 border-gray-100 shadow-xl">
              <div className="aspect-video relative group">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Card>

            {/* What's Included */}
            <Card className="border-2 border-gray-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center text-2xl">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center mr-3 transition-colors">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Highlights */}
            <Card className="border-2 border-gray-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                <CardTitle className="flex items-center text-2xl">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  Why Choose This Service
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Verified Experts</h4>
                    <p className="text-sm text-gray-600">Background checked professionals</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Quality Guaranteed</h4>
                    <p className="text-sm text-gray-600">100% satisfaction guarantee</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Trusted by Thousands</h4>
                    <p className="text-sm text-gray-600">{service.totalReviews}+ happy customers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Provider Selection */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <Card className="border-2 border-blue-200 shadow-xl bg-gradient-to-br from-white to-blue-50">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                      Starting Price
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-5xl font-extrabold text-gray-900">${service.price}</span>
                      <span className="text-2xl text-gray-600 font-medium">
                        {service.priceUnit === 'hour' ? '/hr' : service.priceUnit === 'sqft' ? '/sqft' : ''}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Professional service guaranteed</p>
                  </div>
                </CardContent>
              </Card>

              {/* Available Providers */}
              <Card className="border-2 border-gray-100 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                  <CardTitle className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">Available Providers</div>
                      <div className="text-sm font-normal text-gray-600">{providers.length} experts near you</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {providers.length > 0 ? (
                    <div className="space-y-4">
                      {providers.map((provider) => (
                        <div
                          key={provider.id}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            selectedProvider?.id === provider.id
                              ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                          onClick={() => handleProviderSelect(provider)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="relative">
                              <img
                                src={provider.avatar}
                                alt={provider.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                              />
                              {provider.verified && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-bold text-gray-900 truncate">{provider.name}</h4>
                                {provider.verified && (
                                  <Badge variant="success" className="text-xs flex-shrink-0 ml-2">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center mb-2">
                                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                                  <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                                  <span className="text-sm font-bold text-gray-900">{provider.rating}</span>
                                  <span className="text-xs text-gray-600 ml-1">({provider.totalReviews})</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-2 mb-2">{provider.bio}</p>
                              <div className="flex items-center text-xs text-gray-500">
                                <MapPin className="w-3 h-3 mr-1" />
                                {provider.address.city}, {provider.address.state}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {selectedProvider && (
                        <div className="pt-4 space-y-3">
                          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                            <div className="flex items-center text-green-800 mb-1">
                              <CheckCircle className="w-5 h-5 mr-2" />
                              <span className="font-bold">Provider Selected</span>
                            </div>
                            <p className="text-sm text-green-700 ml-7">
                              You've selected {selectedProvider.name}
                            </p>
                          </div>
                          <Button
                            onClick={handleBookService}
                            className="w-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            size="lg"
                          >
                            <Calendar className="w-5 h-5 mr-2" />
                            {isAuthenticated ? `Book with ${selectedProvider.name}` : 'Login to Book'}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-10 h-10 text-gray-400" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">No Providers Available</h4>
                      <p className="text-sm text-gray-600 mb-6">
                        No providers available for this service in your area at the moment.
                      </p>
                      <Button variant="outline" onClick={() => navigate(ROUTES.USER_SERVICES)}>
                        Browse Other Services
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-0 shadow-xl">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                    <p className="text-blue-100 text-sm mb-4">
                      Our support team is here to assist you 24/7
                    </p>
                    <Button 
                      variant="secondary" 
                      className="w-full bg-white text-indigo-600 hover:bg-gray-100"
                      onClick={() => navigate(ROUTES.CONTACT)}
                    >
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book This Service?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who trust our platform for their home service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!selectedProvider && (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  if (providers.length > 0) {
                    document.querySelector('.lg\\:col-span-1')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="shadow-xl"
              >
                Select a Provider to Book
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate(ROUTES.USER_SERVICES)}
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20"
            >
              Browse More Services
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetails;