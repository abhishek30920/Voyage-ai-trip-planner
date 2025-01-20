import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MapPin, Clock, DollarSign, Navigation } from 'lucide-react';
import PlaceComponent from './PlaceComponent';

const PlacesToVisit = ({ trip }) => {


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Places to Visit</h2>
      
      <div className="space-y-8">
        {trip?.Tripdata.itinerary.map((day, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-slate-50">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Day {day.day}</h3>
                <span className="text-sm text-slate-600">{day.theme}</span>
              </div>
              <p className="text-sm text-slate-600">{day.bestTimeToVisit}</p>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {day.plan.map((place, placeIndex) => (
                  <PlaceComponent key={placeIndex} place={place} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;