import React from 'react';
import { PagePlaceholder } from '@/components/shared/PagePlaceholder';

const ManageUsers: React.FC = () => {
  return (
    <PagePlaceholder 
      title="Manage Users"
      description="Manage all users, providers, and administrators"
      layout="admin"
    />
  );
};

export default ManageUsers;
