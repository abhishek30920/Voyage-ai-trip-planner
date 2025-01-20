import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MapPin, Clock, DollarSign, Navigation } from 'lucide-react';
import PlaceComponent from './PlaceComponent';

const PlacesToVisit = ({ trip }) => {
  if (!trip?.Tripdata?.itinerary) {
    return (
      <div className="p-4 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 rounded mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-slate-900">
          Places to Visit
        </h2>
        
        <div className="space-y-6 sm:space-y-8">
          {trip.Tripdata.itinerary.map((day, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CardHeader className="bg-slate-50 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                      Day {day.day}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {day.bestTimeToVisit}
                    </p>
                  </div>
                  <span className="text-sm font-medium px-3 py-1 bg-slate-100 rounded-full text-slate-600">
                    {day.theme}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {day.plan.map((place, placeIndex) => (
                    <div 
                      key={placeIndex}
                      className="flex flex-col h-full"
                    >
                      <PlaceComponent 
                        place={place} 
                        className="h-full" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacesToVisit;