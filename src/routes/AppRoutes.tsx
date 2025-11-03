import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { RoleBasedRedirect } from '@/components/shared/RoleBasedRedirect';
import { Loader } from '@/components/ui/Loader';
import { ROUTES } from '@/utils/constants';
import { UserRole } from '@/types/user';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/public/Home'));
const LoginPage = lazy(() => import('@/pages/public/Login'));
const RegisterPage = lazy(() => import('@/pages/public/Register'));
const ForgotPasswordPage = lazy(() => import('@/pages/public/ForgotPassword'));
const ResetPasswordPage = lazy(() => import('@/pages/public/ResetPassword'));
const ContactPage = lazy(() => import('@/pages/public/Contact'));

// User pages
const UserServices = lazy(() => import('@/pages/user/Services'));
const UserServiceDetails = lazy(() => import('@/pages/user/ServiceDetails'));
const UserBooking = lazy(() => import('@/pages/user/Booking'));
const UserMyBookings = lazy(() => import('@/pages/user/MyBookings'));
const UserProfile = lazy(() => import('@/pages/user/Profile'));

// Provider pages
const ProviderDashboard = lazy(() => import('@/pages/provider/Dashboard'));
const ProviderJobs = lazy(() => import('@/pages/provider/MyJobs'));
const ProviderJobDetails = lazy(() => import('@/pages/provider/JobDetails'));
const ProviderAvailability = lazy(() => import('@/pages/provider/Availability'));
const ProviderProfile = lazy(() => import('@/pages/provider/Profile'));
const ProviderFeedback = lazy(() => import('@/pages/provider/Feedback'));

// Admin pages
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminUsers = lazy(() => import('@/pages/admin/ManageUsers'));
const AdminServices = lazy(() => import('@/pages/admin/ManageServices'));
const AdminBookings = lazy(() => import('@/pages/admin/ManageBookings'));
const AdminReports = lazy(() => import('@/pages/admin/Reports'));
const AdminSettings = lazy(() => import('@/pages/admin/Settings'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader size="lg" text="Loading page..." />
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}> 
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.USER_SERVICES} element={<UserServices />} />
        {/* Require auth for details and booking */}
        <Route element={<ProtectedRoute />}> 
          <Route path={ROUTES.USER_SERVICE_DETAILS} element={<UserServiceDetails />} />
          <Route path={ROUTES.USER_BOOKING} element={<UserBooking />} />
        </Route>

        {/* Role-based redirect for authenticated users */}
        <Route path="/dashboard" element={<RoleBasedRedirect />} />

        {/* User routes */}
        <Route element={<ProtectedRoute allowedRoles={[UserRole.USER]} />}>
          <Route path={ROUTES.USER_MY_BOOKINGS} element={<UserMyBookings />} />
          <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
        </Route>

        {/* Provider routes */}
        <Route element={<ProtectedRoute allowedRoles={[UserRole.PROVIDER]} />}>
          <Route path={ROUTES.PROVIDER_DASHBOARD} element={<ProviderDashboard />} />
          <Route path={ROUTES.PROVIDER_JOBS} element={<ProviderJobs />} />
          <Route path={ROUTES.PROVIDER_JOB_DETAILS} element={<ProviderJobDetails />} />
          <Route path={ROUTES.PROVIDER_AVAILABILITY} element={<ProviderAvailability />} />
          <Route path={ROUTES.PROVIDER_PROFILE} element={<ProviderProfile />} />
          <Route path={ROUTES.PROVIDER_FEEDBACK} element={<ProviderFeedback />} />
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN_USERS} element={<AdminUsers />} />
          <Route path={ROUTES.ADMIN_SERVICES} element={<AdminServices />} />
          <Route path={ROUTES.ADMIN_BOOKINGS} element={<AdminBookings />} />
          <Route path={ROUTES.ADMIN_REPORTS} element={<AdminReports />} />
          <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminSettings />} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;


