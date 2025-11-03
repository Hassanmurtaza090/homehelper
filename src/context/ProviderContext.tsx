import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceProvider } from '@/types/user';
import { mockProviderProfile } from '@/data/providerMockData';
import { useAuth } from '@/hooks/useAuth';

interface ProviderContextType {
  providerProfile: ServiceProvider | null;
  updateProviderProfile: (updates: Partial<ServiceProvider>) => void;
  isLoading: boolean;
  error: string | null;
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

interface ProviderProviderProps {
  children: ReactNode;
}

export const ProviderProvider: React.FC<ProviderProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [providerProfile, setProviderProfile] = useState<ServiceProvider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load provider profile when user is authenticated as provider
  useEffect(() => {
    if (isAuthenticated && user?.role === 'provider') {
      // In a real app, you would fetch from API
      // For now, use mock data but merge with user data
      const profile = {
        ...mockProviderProfile,
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      setProviderProfile(profile);
      setIsLoading(false);
    } else if (isAuthenticated && user?.role !== 'provider') {
      setProviderProfile(null);
      setIsLoading(false);
    } else {
      setProviderProfile(null);
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const updateProviderProfile = (updates: Partial<ServiceProvider>) => {
    if (providerProfile) {
      const updatedProfile = { ...providerProfile, ...updates, updatedAt: new Date() };
      setProviderProfile(updatedProfile);
      
      // In a real app, you would also update the backend
      console.log('Provider profile updated:', updatedProfile);
    }
  };

  const value: ProviderContextType = {
    providerProfile,
    updateProviderProfile,
    isLoading,
    error,
  };

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
};

export const useProvider = (): ProviderContextType => {
  const context = useContext(ProviderContext);
  if (context === undefined) {
    throw new Error('useProvider must be used within a ProviderProvider');
  }
  return context;
};
