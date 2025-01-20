import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function TripComponent({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (trip) {
      getplace();
    }
  }, [trip]);

  const getplace = async () => {
    try {
      setIsLoading(true);
      const data = {
        textQuery: trip.userSelectedData.location.label
      };

      const resp = await GetPlaceDetails(data);
      const Photourl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(Photourl);
    } catch (error) {
      console.error('Error fetching place details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="relative w-full pt-[66.67%]">
          {isLoading ? (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          ) : (
            <img
              src={photoUrl}
              alt={trip.userSelectedData.location.label}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/api/placeholder/400/300';
                e.target.alt = 'Placeholder';
              }}
            />
          )}
        </div>
        <CardContent className="p-4">
          <h2 className="font-bold text-lg line-clamp-1 mb-1">
            {trip.userSelectedData.location.label}
          </h2>
          <p className="text-sm text-gray-500">
            {trip.userSelectedData.noofDays} Days trip with {trip.userSelectedData.budget} budget
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default TripComponent;