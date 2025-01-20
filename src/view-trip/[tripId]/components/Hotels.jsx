import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star, MapPin, DollarSign, Wifi, Dumbbell, UtensilsCrossed, Coffee } from 'lucide-react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import Hotelcomponents from './Hotelcomponents';


const Hotels = ({ trip }) => {

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Hotel Recommendations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trip?.Tripdata.hotels.map((hotel, index) => (
       <Hotelcomponents hotel={hotel}/>
        ))}
      </div>
    </div>
  );
};

export default Hotels;