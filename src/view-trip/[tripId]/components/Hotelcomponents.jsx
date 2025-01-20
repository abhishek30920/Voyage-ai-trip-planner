import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star, MapPin, DollarSign, Wifi, Dumbbell, UtensilsCrossed, Coffee } from 'lucide-react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { GetPlaceDetails } from '@/service/GlobalApi';
const getAmenityIcon = (amenity) => {
  switch (amenity.toLowerCase()) {
    case 'free wifi':
      return <Wifi size={16} />;
    case 'fitness center':
      return <Dumbbell size={16} />;
    case 'restaurant':
      return <UtensilsCrossed size={16} />;
    case 'bar':
      return <Coffee size={16} />;
    default:
      return null;
  }
};


function Hotelcomponents({hotel}) {
  console.log(hotel)
    const [photoUrl,setPhotoUrl]=React.useState('')
    useEffect(()=>{
      hotel && getplace()
    },[hotel])
       const getplace=async()=>{
        const data={
          textQuery:hotel?.hotelName
        }
      
        const result=await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data)
          // console.log(resp.data.places[0].photos[3].name)
          const Photourl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
          setPhotoUrl(Photourl)
        })
       }
    // console.log(trip)
    // console.log(trip?.Tripdata.hotels)
  return (
    <div>
       <Card 
            key={hotel.hotelName} 
            className="overflow-hidden group hover:shadow-lg transition-all duration-300"
          >
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName + "," + hotel.hotelAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={photoUrl}
                  alt={hotel.hotelName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 h-[200px]"
                />
              </div>

              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {hotel.hotelName}
                  </h3>
                  
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{hotel.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="line-clamp-2">{hotel.hotelAddress}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-medium">
                    {hotel.price.approximatePricePerNight} {hotel.price.currency}
                  </span>
                  <span className="text-slate-600">per night</span>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex flex-wrap gap-3">
                    {hotel.amenities.slice(0, 4).map((amenity, index) => {
                      const icon = getAmenityIcon(amenity);
                      if (!icon) return null;
                      return (
                        <div 
                          key={index}
                          className="flex items-center gap-1 text-xs text-slate-600"
                          title={amenity}
                        >
                          {icon}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <p className="text-sm text-slate-600 line-clamp-2">
                  {hotel.descriptions}
                </p>
              </CardContent>
            </a>
          </Card>
    </div>
  )
}

export default Hotelcomponents
