import React from 'react';
import { PagePlaceholder } from '@/components/shared/PagePlaceholder';

const ManageBookings: React.FC = () => {
  return (
    <PagePlaceholder 
      title="Manage Bookings"
      description="View and manage all customer bookings"
      layout="admin"
    />
  );
};

export default ManageBookings;
