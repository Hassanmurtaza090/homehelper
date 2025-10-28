import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Service } from '@/types/service';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/utils/validators';

interface ServiceCardProps {
  service: Service;
  onBook?: () => void;
  showActions?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onBook,
  showActions = true 
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/user/services/${service.id}`);
  };

  const handleBook = () => {
    if (onBook) {
      onBook();
    } else {
      navigate(`/user/services/${service.id}`);
    }
  };

  const getPriceDisplay = () => {
    const price = formatCurrency(service.price);
    switch (service.priceUnit) {
      case 'hour':
        return `${price}/hour`;
      case 'sqft':
        return `${price}/sqft`;
      default:
        return price;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={service.image || 'https://via.placeholder.com/400x300'}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        {!service.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Currently Unavailable</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg shadow-md">
          <span className="text-sm font-semibold text-primary">{service.category}</span>
        </div>
      </div>
      
      <CardContent className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary">{getPriceDisplay()}</span>
            {service.duration && (
              <span className="text-sm text-gray-500">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.duration} min
              </span>
            )}
          </div>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {service.rating} ({service.totalReviews} reviews)
              </span>
            </div>
          </div>
          
          {showActions && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={handleViewDetails}
              >
                View Details
              </Button>
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={handleBook}
                disabled={!service.available}
              >
                Book Now
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
