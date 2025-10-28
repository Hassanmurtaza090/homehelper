import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ROUTES, SERVICE_CATEGORIES } from '@/utils/constants';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section - Enhanced with better gradients and animation */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
              🏠 Trusted by 50,000+ Homeowners
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Your Home, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Our Priority</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-50 max-w-3xl mx-auto leading-relaxed">
              Book trusted, vetted professionals for all your home service needs in minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate(ROUTES.USER_SERVICES)}
                className="shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold"
              >
                Browse Services →
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate(`${ROUTES.REGISTER}?role=provider`)}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 shadow-2xl px-8 py-6 text-lg font-semibold"
              >
                Become a Provider
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-100">Background Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-100">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-100">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Wave SVG */}
        <div className="absolute bottom-0 w-full">
          <svg className="relative block w-full h-28" preserveAspectRatio="none" viewBox="0 0 1440 74">
            <path fill="rgb(249 250 251)" d="M0,32L48,37.3C96,43,192,53,288,56C384,59,480,53,576,48C672,43,768,37,864,37.3C960,37,1056,43,1152,45.3C1248,48,1344,48,1392,48L1440,48L1440,74L1392,74C1344,74,1248,74,1152,74C1056,74,960,74,864,74C768,74,672,74,576,74C480,74,384,74,288,74C192,74,96,74,48,74L0,74Z"></path>
          </svg>
        </div>
      </section>

      {/* Service Categories - Enhanced with hover effects */}
      <section className="py-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Popular Services</h2>
            <p className="text-xl text-gray-600">Choose from our wide range of professional home services</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {SERVICE_CATEGORIES.slice(0, 10).map((category) => (
              <Card
                key={category.value}
                className="cursor-pointer group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
                onClick={() => navigate(`${ROUTES.USER_SERVICES}?category=${category.value}`)}
              >
                <CardContent className="text-center p-6">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{category.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button
              variant="outline"
              onClick={() => navigate(ROUTES.USER_SERVICES)}
              className="px-8 py-3 text-base font-semibold"
            >
              View All Services →
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced with better icons and layout */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Book a service in 3 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>
            
            {[
              {
                step: '1',
                title: 'Choose a Service',
                description: 'Browse our wide range of home services and select what you need',
                icon: (
                  <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                color: 'from-blue-500 to-blue-600'
              },
              {
                step: '2',
                title: 'Book & Schedule',
                description: 'Pick a convenient time and provide your address details',
                icon: (
                  <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                step: '3',
                title: 'Relax & Enjoy',
                description: 'Our verified professionals will arrive on time and get the job done',
                icon: (
                  <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: 'from-purple-500 to-purple-600'
              },
            ].map((item) => (
              <div key={item.step} className="text-center relative group">
                <div className="flex justify-center mb-6">
                  <div className={`w-24 h-24 bg-gradient-to-br ${item.color} text-white rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10`}>
                    {item.icon}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className={`inline-block px-3 py-1 bg-gradient-to-r ${item.color} text-white text-sm font-bold rounded-full mb-3`}>
                    Step {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* About Us - Enhanced with better imagery */}
       <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                About HomeHelper
              </div>
              
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                Your Trusted Partner for Home Services
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                HomeHelper connects homeowners with trusted, vetted service providers for everything from cleaning and
                plumbing to electrical and painting. Our mission is to make home maintenance simple, transparent, and reliable.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We carefully curate professionals, ensure quality service through ratings and reviews, and provide a seamless
                booking experience with clear pricing. Whether you need a one-time fix or ongoing help, we've got you covered.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Vetted Professionals</h4>
                    <p className="text-sm text-gray-600">Background checked experts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Secure Payments</h4>
                    <p className="text-sm text-gray-600">Safe & encrypted transactions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Upfront Pricing</h4>
                    <p className="text-sm text-gray-600">No hidden charges</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
                    <p className="text-sm text-gray-600">Always here to help</p>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                onClick={() => navigate(ROUTES.USER_SERVICES)}
                className="shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative h-[500px] w-full">
                {/* Background gradient blobs */}
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-2000"></div>
                <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-4000"></div>
                
                {/* Professional Person Illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full max-w-md flex items-center justify-center">
                    
                    {/* Main Person Figure */}
                    <div className="relative z-10 animate-float">
                      {/* Head */}
                      <div className="relative">
                        <div className="w-28 h-28 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mx-auto border-4 border-white shadow-xl">
                          {/* Face */}
                          <div className="relative pt-8">
                            {/* Eyes */}
                            <div className="flex justify-center gap-4 mb-2">
                              <div className="w-2.5 h-2.5 bg-gray-800 rounded-full"></div>
                              <div className="w-2.5 h-2.5 bg-gray-800 rounded-full"></div>
                            </div>
                            {/* Smile */}
                            <div className="w-8 h-3 border-b-2 border-gray-800 rounded-full mx-auto"></div>
                          </div>
                        </div>
                        {/* Hard Hat */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <div className="w-32 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-t-full border-4 border-white shadow-lg"></div>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-amber-400 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Body */}
                      <div className="relative mt-2">
                        {/* Torso */}
                        <div className="w-40 h-48 bg-gradient-to-br from-blue-600 to-blue-700 rounded-t-3xl mx-auto border-4 border-white shadow-xl">
                          {/* Work Badge */}
                          <div className="absolute top-4 right-4 w-8 h-10 bg-white rounded shadow-md flex items-center justify-center">
                            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                          </div>
                          
                          {/* Pocket */}
                          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-blue-800 rounded-b-lg border-t-2 border-blue-900"></div>
                        </div>
                        
                        {/* Arms */}
                        {/* Left Arm - holding wrench */}
                        <div className="absolute top-8 -left-8 w-12 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full transform -rotate-45 border-4 border-white shadow-lg"></div>
                        <div className="absolute top-32 -left-12 w-10 h-10 bg-amber-200 rounded-full border-4 border-white shadow-lg"></div>
                        
                        {/* Wrench in left hand */}
                        <div className="absolute top-36 -left-20 transform -rotate-45">
                          <div className="w-4 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full shadow-lg"></div>
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 border-4 border-gray-700 rounded-full bg-transparent"></div>
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-3 bg-gray-700 rounded"></div>
                        </div>
                        
                        {/* Right Arm - holding toolbox */}
                        <div className="absolute top-8 -right-8 w-12 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full transform rotate-45 border-4 border-white shadow-lg"></div>
                        <div className="absolute top-32 -right-12 w-10 h-10 bg-amber-200 rounded-full border-4 border-white shadow-lg"></div>
                        
                        {/* Toolbox in right hand */}
                        <div className="absolute top-36 -right-16">
                          <div className="w-16 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg border-4 border-white shadow-xl">
                            <div className="w-full h-2 bg-red-800 mt-1"></div>
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-8 h-3 bg-gray-700 rounded-t"></div>
                          </div>
                        </div>
                        
                        {/* Legs */}
                        <div className="absolute -bottom-20 left-8 w-14 h-20 bg-gray-800 rounded-b-lg border-4 border-white shadow-lg"></div>
                        <div className="absolute -bottom-20 right-8 w-14 h-20 bg-gray-800 rounded-b-lg border-4 border-white shadow-lg"></div>
                        
                        {/* Shoes */}
                        <div className="absolute -bottom-24 left-6 w-16 h-6 bg-gray-900 rounded-full border-2 border-white shadow-lg"></div>
                        <div className="absolute -bottom-24 right-6 w-16 h-6 bg-gray-900 rounded-full border-2 border-white shadow-lg"></div>
                      </div>
                    </div>
                    
                    {/* Floating Tools Around Person */}
                    {/* Hammer */}
                    <div className="absolute top-16 right-8 animate-float animation-delay-1000">
                      <div className="relative transform rotate-45">
                        <div className="w-3 h-16 bg-gradient-to-b from-amber-700 to-amber-800 rounded-full"></div>
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Screwdriver */}
                    <div className="absolute top-32 left-4 animate-float animation-delay-2000">
                      <div className="relative transform -rotate-45">
                        <div className="w-2 h-14 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full"></div>
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gray-600 rounded-t-full"></div>
                      </div>
                    </div>
                    
                    {/* Paint Brush */}
                    <div className="absolute bottom-24 right-4 animate-float animation-delay-3000">
                      <div className="relative transform rotate-12">
                        <div className="w-2 h-12 bg-gradient-to-b from-amber-600 to-amber-700 rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-400 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Gear Icon */}
                    <div className="absolute top-24 left-12 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-spin-slow">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    
                    {/* Star ratings */}
                    <div className="absolute top-8 right-16 flex animate-pulse">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    {/* Checkmark badge */}
                    <div className="absolute bottom-28 left-8 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-3 border-white animate-float animation-delay-4000">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Trusted by Thousands</h2>
            <p className="text-blue-100">Join our growing community</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Happy Customers', value: '50,000+', icon: '😊' },
              { label: 'Service Providers', value: '5,000+', icon: '👷' },
              { label: 'Services Completed', value: '100,000+', icon: '✅' },
              { label: 'Cities Covered', value: '25+', icon: '🏙️' },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-5xl font-extrabold mb-2">{stat.value}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust HomeHelper for their home service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate(ROUTES.REGISTER)}
              className="shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 px-10 py-6 text-lg font-semibold"
            >
              Sign Up Now - It's Free! →
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate(ROUTES.USER_SERVICES)}
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 shadow-2xl px-10 py-6 text-lg font-semibold"
            >
              Browse Services
            </Button>
          </div>
          <p className="mt-8 text-sm text-gray-400">
            No credit card required • Cancel anytime • 24/7 support
          </p>
        </div>
      </section>

      <Footer />
      
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;