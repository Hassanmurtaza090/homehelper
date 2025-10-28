import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/user';
import { ROUTES } from '@/utils/constants';
import { Loader } from '@/components/ui/Loader';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles = [],
  redirectTo = ROUTES.LOGIN,
  children,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader fullScreen text="Loading..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    let redirectPath = ROUTES.HOME;
    switch (user.role) {
      case UserRole.ADMIN:
        redirectPath = ROUTES.ADMIN_DASHBOARD;
        break;
      case UserRole.PROVIDER:
        redirectPath = ROUTES.PROVIDER_DASHBOARD;
        break;
      case UserRole.USER:
        redirectPath = ROUTES.USER_DASHBOARD;
        break;
    }
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
