import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/user';
import { ROUTES } from '@/utils/constants';
import { Loader } from '@/components/ui/Loader';

export const RoleBasedRedirect: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate(ROUTES.LOGIN);
      } else if (user) {
        switch (user.role) {
          case UserRole.ADMIN:
            navigate(ROUTES.ADMIN_DASHBOARD);
            break;
          case UserRole.PROVIDER:
            navigate(ROUTES.PROVIDER_DASHBOARD);
            break;
          case UserRole.USER:
            navigate(ROUTES.USER_SERVICES);
            break;
          default:
            navigate(ROUTES.HOME);
        }
      }
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  return <Loader fullScreen text="Redirecting..." />;
};
