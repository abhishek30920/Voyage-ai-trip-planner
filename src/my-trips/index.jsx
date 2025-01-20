import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import TripComponent from './components/TripComponent';
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const MyTrips = () => {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        navigation('/');
        return;
      }

      const q = query(collection(db, 'AItrips'), where('UserEmail', '==', user?.email));
      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      setUserTrips(trips);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center space-x-3 mb-8">
          <MapPin className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">My Trips</h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        ) : userTrips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTrips.map((trip, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                <TripComponent trip={trip} className="h-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No trips found</h3>
            <p className="text-gray-500">Start planning your next adventure!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;