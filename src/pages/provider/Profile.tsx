import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProviderSidebar } from '@/components/layout/Sidebar';
import { serviceCategories } from '@/data/providerMockData';
import { ServiceCategory } from '@/types/service';
import { ServiceProvider } from '@/types/user';
import { formatPhoneNumber } from '@/utils/helpers';
import { useProvider } from '@/context/ProviderContext';
import { Loader } from '@/components/ui/Loader';

const Profile: React.FC = () => {
  const { providerProfile, updateProviderProfile, isLoading } = useProvider();
  const [profile, setProfile] = useState<ServiceProvider | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Update local state when provider profile changes
  useEffect(() => {
    if (providerProfile) {
      setProfile({
        ...providerProfile,
        servicesOffered: [...providerProfile.servicesOffered],
        address: {
          street: providerProfile.address?.street || '',
          city: providerProfile.address?.city || '',
          state: providerProfile.address?.state || '',
          zipCode: providerProfile.address?.zipCode || '',
          country: providerProfile.address?.country || '',
        },
      });
      setProfileImage(providerProfile.avatar || null);
    }
  }, [providerProfile]);

  if (isLoading) {
    return <Loader fullScreen text="Loading profile..." />;
  }

  if (!providerProfile || !profile) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <ProviderSidebar />
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Profile Not Found</h2>
              <p className="text-gray-600 mt-2">Unable to load provider profile.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (!profile) return;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setProfile({
        ...profile,
        address: {
          street: profile.address?.street || '',
          city: profile.address?.city || '',
          state: profile.address?.state || '',
          zipCode: profile.address?.zipCode || '',
          country: profile.address?.country || '',
          [addressField]: value,
        },
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };
  
  // Handle service category selection
  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const category = value as ServiceCategory;
    
    if (!profile) return;
    
    if (checked) {
      setProfile({
        ...profile,
        servicesOffered: [...profile.servicesOffered, category],
      });
    } else {
      setProfile({
        ...profile,
        servicesOffered: profile.servicesOffered.filter(service => service !== category),
      });
    }
  };
  
  // Handle experience input for each service
  const handleExperienceChange = (category: ServiceCategory, years: number) => {
    if (!profile) return;
    
    setProfile({
      ...profile,
      serviceExperience: {
        ...profile.serviceExperience || {},
        [category]: years,
      },
    });
  };
  
  // Handle profile image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      // Update the provider profile in context (this will update across all pages)
      updateProviderProfile({
        ...profile,
        avatar: profileImage || profile.avatar,
      });
      
      console.log('Profile updated:', profile);
      console.log('Image file:', imageFile);
      
      // Toggle editing mode off
      setIsEditing(false);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProviderSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Provider Profile</h1>
          <p className="text-gray-600 mt-1">Manage your professional profile and credentials</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Profile Image Section */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                      {profileImage ? (
                        <img 
                          src={profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <label 
                        htmlFor="profile-image" 
                        className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer shadow-md"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input 
                          id="profile-image" 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleImageChange} 
                        />
                      </label>
                    )}
                  </div>
                  <div className="ml-6">
                    <h3 className="font-medium text-gray-900">{profile.name}</h3>
                    <p className="text-gray-500">{profile.email}</p>
                    <div className="mt-2 flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(profile.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="ml-2 text-sm text-gray-500">({profile.totalReviews} reviews)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        required
                      />
                    ) : (
                      <p className="text-gray-900">{profile.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        required
                      />
                    ) : (
                      <p className="text-gray-900">{profile.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profile.phone || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="+1 (555) 123-4567"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.phone ? formatPhoneNumber(profile.phone) : 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="cnic" className="block text-sm font-medium text-gray-700 mb-1">
                      CNIC / ID Number
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="cnic"
                        name="cnic"
                        value={profile.cnic || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="12345-1234567-1"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.cnic || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="street"
                        name="address.street"
                        value={profile.address?.street || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.address?.street || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="city"
                        name="address.city"
                        value={profile.address?.city || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.address?.city || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State / Province
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="state"
                        name="address.state"
                        value={profile.address?.state || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.address?.state || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP / Postal Code
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="zipCode"
                        name="address.zipCode"
                        value={profile.address?.zipCode || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.address?.zipCode || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="country"
                        name="address.country"
                        value={profile.address?.country || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.address?.country || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        id="bio"
                        name="bio"
                        value={profile.bio || ''}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="Tell clients about your professional background, skills, and experience..."
                      />
                    ) : (
                      <p className="text-gray-900">{profile.bio || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Services Offered
                    </label>
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {serviceCategories.map((category) => (
                          <div key={category.value} className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id={`service-${category.value}`}
                                name={`service-${category.value}`}
                                type="checkbox"
                                value={category.value}
                                checked={profile.servicesOffered.includes(category.value)}
                                onChange={handleServiceChange}
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor={`service-${category.value}`} className="font-medium text-gray-700">
                                {category.label}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile.servicesOffered.length > 0 ? (
                          profile.servicesOffered.map((service) => {
                            const category = serviceCategories.find(cat => cat.value === service);
                            return (
                              <span 
                                key={service} 
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                              >
                                {category?.label || service}
                              </span>
                            );
                          })
                        ) : (
                          <p className="text-gray-500">No services selected</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {isEditing && profile.servicesOffered.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Experience in Selected Services (Years)
                      </label>
                      <div className="space-y-4">
                        {profile.servicesOffered.map((service) => {
                          const category = serviceCategories.find(cat => cat.value === service);
                          return (
                            <div key={service} className="flex items-center">
                              <span className="w-1/3 text-sm text-gray-700">{category?.label || service}</span>
                              <input
                                type="number"
                                min="0"
                                max="50"
                                value={profile.serviceExperience?.[service] || 0}
                                onChange={(e) => handleExperienceChange(service as ServiceCategory, parseInt(e.target.value))}
                                className="ml-4 w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                              />
                              <span className="ml-2 text-sm text-gray-500">years</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {!isEditing && profile.serviceExperience && Object.keys(profile.serviceExperience).length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Experience</h4>
                      <div className="space-y-2">
                        {Object.entries(profile.serviceExperience).map(([service, years]) => {
                          const category = serviceCategories.find(cat => cat.value === service);
                          return (
                            <div key={service} className="flex items-center">
                              <span className="text-sm text-gray-700">{category?.label || service}:</span>
                              <span className="ml-2 text-sm text-gray-900">{years} years</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Total Years of Experience
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        min="0"
                        max="50"
                        value={profile.experience || 0}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.experience} years</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Action Buttons */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Profile Actions</h3>
                  <p className="text-sm text-gray-500">Manage your profile information</p>
                </div>
                <div className="flex space-x-4">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        💾 Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        console.log('Edit Profile clicked!');
                        setIsEditing(true);
                      }}
                      className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      ✏️ Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;