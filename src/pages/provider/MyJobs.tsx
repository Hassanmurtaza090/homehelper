import React from 'react';
import { PagePlaceholder } from '@/components/shared/PagePlaceholder';

const MyJobs: React.FC = () => {
  return (
    <PagePlaceholder 
      title="My Jobs"
      description="View and manage your assigned jobs"
      layout="provider"
    />
  );
};

export default MyJobs;
