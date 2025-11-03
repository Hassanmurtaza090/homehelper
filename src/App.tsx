import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { BookingProvider } from '@/context/BookingContext';
import { ProviderProvider } from '@/context/ProviderContext';
import { AppRoutes } from '@/routes/AppRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProviderProvider>
          <BookingProvider>
            <AppRoutes />
          </BookingProvider>
        </ProviderProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
