import React, { useEffect } from 'react'

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MapPin, Clock, DollarSign, Navigation } from 'lucide-react';

import { GetPlaceDetails } from '@/service/GlobalApi'
import { PHOTO_REF_URL } from '@/service/GlobalApi'
const openInMaps = (place) => {
  const query = `${place.placeName},${place.geoCoordinates.latitude},${place.geoCoordinates.longitude}`;
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};
function PlaceComponent({place}) {
 const [photoUrl,setPhotoUrl]=React.useState('')
    useEffect(()=>{
      place && getplace()
    },[place])
       const getplace=async()=>{
        const data={
          textQuery:place?.placeName
        }
      
        const result=await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data)
          // console.log(resp.data.places[0].photos[3].name)
          const Photourl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
          setPhotoUrl(Photourl)
        })
       }

console.log(place)
  return (
 <div>
  <Card key={place.placeName} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={photoUrl}
                        alt={place.placeName}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-lg truncate">
                          {place.placeName}
                        </h4>
                        <button
                          onClick={() => openInMaps(place)}
                          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                          title="Open in Google Maps"
                        >
                          <Navigation size={16} className="text-slate-600" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {place.placeDetails}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock size={16} />
                          <span>{place.bestTime}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin size={16} />
                          <span>{place.timeTravel}</span>
                        </div>
                        
                        {place.ticketPricing.approximatePrice > 0 && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <DollarSign size={16} />
                            <span>
                              {place.ticketPricing.approximatePrice} {place.ticketPricing.currency}
                            </span>
                          </div>
                        )}

                        <div 
                          className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-slate-800"
                          onClick={() => openInMaps(place)}
                        >
                          <Navigation size={16} />
                          <span className="underline">View on Maps</span>
                        </div>
                      </div>
                    </div>
                  </Card>
 </div>
  )
}

export default PlaceComponent
