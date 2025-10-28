import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AdminSidebar, ProviderSidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface PagePlaceholderProps {
  title: string;
  description?: string;
  layout?: 'default' | 'admin' | 'provider';
}

export const PagePlaceholder: React.FC<PagePlaceholderProps> = ({
  title,
  description = 'This page is under development',
  layout = 'default',
}) => {
  const content = (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (layout === 'admin') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1">{content}</div>
      </div>
    );
  }

  if (layout === 'provider') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <ProviderSidebar />
        <div className="flex-1">{content}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {content}
      <Footer />
    </div>
  );
};
