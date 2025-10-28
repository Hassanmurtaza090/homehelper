import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { UserRole } from '@/types/user';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Additional helper functions
  const hasRole = (role: UserRole): boolean => {
    return context.user?.role === role;
  };
  
  const isAdmin = (): boolean => {
    return hasRole(UserRole.ADMIN);
  };
  
  const isProvider = (): boolean => {
    return hasRole(UserRole.PROVIDER);
  };
  
  const isUser = (): boolean => {
    return hasRole(UserRole.USER);
  };
  
  const canAccess = (allowedRoles: UserRole[]): boolean => {
    return context.user ? allowedRoles.includes(context.user.role) : false;
  };
  
  return {
    ...context,
    hasRole,
    isAdmin,
    isProvider,
    isUser,
    canAccess,
  };
};
