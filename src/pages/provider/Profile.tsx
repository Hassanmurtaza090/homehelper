import React from 'react';
import { PagePlaceholder } from '@/components/shared/PagePlaceholder';

const Profile: React.FC = () => {
  return (
    <PagePlaceholder 
      title="Provider Profile"
      description="Manage your provider profile and credentials"
      layout="provider"
    />
  );
};

export default Profile;
