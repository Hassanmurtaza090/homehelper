import React from 'react';
import { PagePlaceholder } from '@/components/shared/PagePlaceholder';

const Dashboard: React.FC = () => {
  return (
    <PagePlaceholder 
      title="Provider Dashboard"
      description="Manage your services and view your performance"
      layout="provider"
    />
  );
};

export default Dashboard;
