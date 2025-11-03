import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { mockServices, getServicesByCategory } from '@/data/mockData';
import { Service, ServiceCategory } from '@/types/service';
import { SERVICE_CATEGORIES, ROUTES } from '@/utils/constants';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState<Service[]>(mockServices);
  const [filteredServices, setFilteredServices] = useState<Service[]>(mockServices);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');

  useEffect(() => {
    // Get category from URL params
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
      const categoryServices = getServicesByCategory(category as ServiceCategory);
      setServices(categoryServices);
      setFilteredServices(categoryServices);
    } else {
      setServices(mockServices);
      setFilteredServices(mockServices);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = services;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort services
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredServices(filtered);
  }, [services, searchQuery, sortBy]);

  const handleCategoryFilter = (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory('');
      setServices(mockServices);
      setFilteredServices(mockServices);
    } else {
      setSelectedCategory(category);
      const categoryServices = getServicesByCategory(category as ServiceCategory);
      setServices(categoryServices);
      setFilteredServices(categoryServices);
    }
  };

  const handleServiceSelect = (service: Service) => {
    navigate(`${ROUTES.USER_SERVICE_DETAILS.replace(':id', service.id)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-block mb-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
              🔍 Explore Our Services
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Professional Home Services
            </h1>
            <p className="text-xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
              Choose from our wide range of trusted professionals for all your home needs
            </p>
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
        {/* Search and Filters Section */}
        <div className="mb-10">
          {/* Enhanced Professional Search Bar - Centered with Moderate Width */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
              {/* Search Input and Sort Dropdown in One Row */}
              <div className="flex gap-3">
                {/* Search Input with Icon and Clear Button */}
                <div className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                    className="w-full pl-10 pr-10 py-2.5 text-sm border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg shadow-sm transition-all duration-200 placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-md transition-all duration-200"
                      aria-label="Clear search"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Sort Dropdown with Icon */}
                <div className="relative w-52">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
                    className="w-full pl-9 pr-8 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white appearance-none cursor-pointer transition-all duration-200 shadow-sm hover:border-gray-300"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price">Price (Low-High)</option>
                    <option value="rating">Rating (High-Low)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            
              {/* Active Filters Display */}
              {(searchQuery || selectedCategory) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Active Filters:
                    </span>
                    {searchQuery && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-sm font-medium border border-blue-200 shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        "{searchQuery}"
                        <button onClick={() => setSearchQuery('')} className="hover:text-blue-900 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-200 shadow-sm">
                        <span>{SERVICE_CATEGORIES.find(c => c.value === selectedCategory)?.icon}</span>
                        {SERVICE_CATEGORIES.find(c => c.value === selectedCategory)?.label}
                        <button onClick={() => handleCategoryFilter('')} className="hover:text-indigo-900 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category Filters with Enhanced Design - Centered */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedCategory === '' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleCategoryFilter('')}
                className={`px-5 py-2.5 font-medium transition-all duration-300 ${
                  selectedCategory === '' 
                    ? 'shadow-lg transform scale-105' 
                    : 'hover:shadow-md hover:scale-105'
                }`}
              >
                <span className="mr-1">🏠</span> All Services
              </Button>
              {SERVICE_CATEGORIES.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryFilter(category.value)}
                  className={`px-5 py-2.5 font-medium transition-all duration-300 ${
                    selectedCategory === category.value 
                      ? 'shadow-lg transform scale-105' 
                      : 'hover:shadow-md hover:scale-105'
                  }`}
                >
                  <span className="mr-1">{category.icon}</span> {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary Bar */}
        <div className="mb-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl px-6 py-4 border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Showing <span className="text-blue-600 font-bold">{filteredServices.length}</span> of {mockServices.length} services
              </p>
              {selectedCategory && (
                <p className="text-xs text-gray-500">
                  in {SERVICE_CATEGORIES.find(c => c.value === selectedCategory)?.label}
                </p>
              )}
            </div>
          </div>
          
          {(searchQuery || selectedCategory) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setServices(mockServices);
                setFilteredServices(mockServices);
              }}
              className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All Filters
            </Button>
          )}
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div 
                key={service.id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <ServiceCard
                  service={service}
                  onBook={() => handleServiceSelect(service)}
                />
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="text-center py-16">
              <div className="max-w-md mx-auto">
                {/* Empty State Icon */}
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Services Found</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {searchQuery 
                    ? `We couldn't find any services matching "${searchQuery}"`
                    : selectedCategory
                    ? `No services available in this category right now`
                    : 'No services available at the moment'
                  }
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('');
                      setServices(mockServices);
                      setFilteredServices(mockServices);
                    }}
                    className="shadow-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Clear All Filters
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery('')}
                  >
                    Browse All Services
                  </Button>
                </div>
                
                {/* Suggestions */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3 font-medium">Try searching for:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Cleaning', 'Plumbing', 'Electrical', 'Painting'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setSearchQuery(suggestion)}
                        className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Load More Section (Optional) */}
        {filteredServices.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="text-sm text-gray-600 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
                Viewing all <span className="font-semibold text-gray-900">{filteredServices.length}</span> available services
              </div>
              {filteredServices.length < mockServices.length && (
                <p className="text-sm text-gray-500">
                  {mockServices.length - filteredServices.length} more services available with different filters
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact our support team and we'll help you find the perfect service provider
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate(ROUTES.CONTACT)}
              className="shadow-xl"
            >
              Contact Support
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate(ROUTES.HOME)}
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;