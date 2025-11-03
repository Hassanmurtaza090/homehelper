import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';
 

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, isAdmin, isProvider, isUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  
  // Handle smooth scrolling for anchor links
  useEffect(() => {
    // Check if the URL has a hash
    if (location.hash) {
      const id = location.hash.substring(1); // Remove the # character
      const element = document.getElementById(id);
      if (element) {
        // Wait a bit for any page transitions to complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);
  
  // Function to handle anchor link clicks
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    const isAnchorLink = path.includes('#');
    
    if (isAnchorLink) {
      const [basePath, hash] = path.split('#');
      const currentPath = location.pathname;
      
      // If we're already on the correct base path, just scroll to the element
      if (basePath === '' || currentPath === basePath) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  const getDashboardRoute = () => {
    if (isAdmin()) return ROUTES.ADMIN_DASHBOARD;
    if (isProvider()) return ROUTES.PROVIDER_DASHBOARD;
    if (isUser()) return ROUTES.USER_SERVICES;
    return ROUTES.HOME;
  };

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { path: ROUTES.HOME, label: 'Home' },
        { path: ROUTES.USER_SERVICES, label: 'Services' },
        { path: `${ROUTES.HOME}#about`, label: 'About' },
        { path: ROUTES.CONTACT, label: 'Contact' },
      ];
    }

    if (isAdmin()) {
      return [
        { path: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard' },
        { path: ROUTES.ADMIN_USERS, label: 'Users' },
        { path: ROUTES.ADMIN_SERVICES, label: 'Services' },
        { path: ROUTES.ADMIN_BOOKINGS, label: 'Bookings' },
        { path: ROUTES.ADMIN_REPORTS, label: 'Reports' },
        { path: `${ROUTES.HOME}#about`, label: 'About' },
      ];
    }

    if (isProvider()) {
      return [
        { path: ROUTES.PROVIDER_DASHBOARD, label: 'Dashboard' },
        { path: ROUTES.PROVIDER_JOBS, label: 'My Jobs' },
        { path: ROUTES.PROVIDER_AVAILABILITY, label: 'Availability' },
        { path: ROUTES.PROVIDER_FEEDBACK, label: 'Feedback' },
        { path: `${ROUTES.HOME}#about`, label: 'About' },
      ];
    }

    // User role
    return [
      { path: ROUTES.USER_SERVICES, label: 'Services' },
      { path: ROUTES.USER_MY_BOOKINGS, label: 'My Bookings' },
      { path: `${ROUTES.HOME}#about`, label: 'About' },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to={isAuthenticated ? getDashboardRoute() : ROUTES.HOME} className="flex items-center">
              <svg className="w-8 h-8 text-primary mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span className="text-xl font-bold text-gray-900">HomeHelper</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleAnchorClick(e, link.path)}
                className={`
                  text-sm font-medium transition-colors
                  ${(location.pathname === link.path || (link.path.includes('#') && location.pathname + link.path.substring(link.path.indexOf('#')) === link.path))
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-700 '}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate(ROUTES.REGISTER)}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-3 text-gray-700  transition-colors"
                >
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <Link
                      to={
                        isAdmin() ? ROUTES.ADMIN_SETTINGS :
                        isProvider() ? ROUTES.PROVIDER_PROFILE :
                        ROUTES.USER_PROFILE
                      }
                      className="block px-4 py-2 text-sm text-gray-700 "
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </div>
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 "
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700  focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${(location.pathname === link.path || (link.path.includes('#') && location.pathname + link.path.substring(link.path.indexOf('#')) === link.path))
                    ? 'text-primary bg-blue-50' 
                    : 'text-gray-700  '}
                `}
                onClick={(e) => {
                  handleAnchorClick(e, link.path);
                  setMobileMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {!isAuthenticated ? (
            <div className="px-2 pb-3 space-y-1 border-t border-gray-200">
              <Button
                variant="ghost"
                fullWidth
                onClick={() => {
                  navigate(ROUTES.LOGIN);
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  navigate(ROUTES.REGISTER);
                  setMobileMenuOpen(false);
                }}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="px-2 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3 py-2">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-900">{user?.name}</div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <Link
                  to={
                    isAdmin() ? ROUTES.ADMIN_SETTINGS :
                    isProvider() ? ROUTES.PROVIDER_PROFILE :
                    ROUTES.USER_PROFILE
                  }
                  className="block px-3 py-2 text-base font-medium text-gray-700   rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700   rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
