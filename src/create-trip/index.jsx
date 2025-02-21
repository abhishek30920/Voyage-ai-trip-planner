import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { MapPin, Calendar, Users, Plane } from 'lucide-react';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { toast } from '@/hooks/use-toast';
import { FcGoogle } from "react-icons/fc";
import { Audio } from "react-loader-spinner";
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

// Loading Overlay Component
const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center space-y-4">
      <img src="/logo.svg" alt="Logo" className="w-24 h-24 animate-pulse" />
      <Audio
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="loading"
      />
      <p className="text-lg font-semibold text-gray-700">Creating your perfect trip plan...</p>
      <p className="text-sm text-gray-500">This may take a few moments</p>
    </div>
  </div>
);

function CreateTrip() {
  const [place, setPlace] = useState();
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTravelType, setSelectedTravelType] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleBudgetSelect = (option) => {
    setSelectedBudget(option.id);
    handleInputChange('budget', option.title);
  };

  const handleTravelTypeSelect = (option) => {
    setSelectedTravelType(option.id);
    handleInputChange('traveler', option.people);
  };

  const Login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: 'application/json'
          }
        }
      );
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTripPlan();
    } catch (error) {
      toast({ title: "Failed to get user profile", type: "error" });
    }
  };

  const saveaitrip = async (tripdata) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const docID = Date.now().toString();
      await setDoc(doc(db, "AItrips", docID), {
        userSelectedData: formData,
        Tripdata: JSON.parse(tripdata),
        UserEmail: user?.email,
        id: docID
      });
      navigate(`/view-trip/${docID}`);
    } catch (error) {
      setLoading(false);
      toast({ title: "Failed to save trip", type: "error" });
    }
  };

  const OnGenerateTripPlan = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      toast({ title: "Please Login to Generate Trip Plan", type: "error" });
      return;
    }

    if (!formData?.location || !formData?.noofDays || !formData?.budget || !formData?.traveler) {
      toast({ title: "Please fill all the Details", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const Final_prompt = AI_PROMPT.replace("{location}", formData?.location.label)
        .replace("{totalDays}", formData?.noofDays)
        .replace("{traveler}", formData?.traveler)
        .replace("{budget}", formData?.budget)
        .replace("{totalDays}", formData?.noofDays);

      const result = await chatSession.sendMessage(Final_prompt);
      await saveaitrip(result?.response?.text());
    } catch (error) {
      setLoading(false);
      toast({ title: "Failed to generate trip plan", type: "error" });
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Plan Your Dream Trip
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Tell us your preferences and let our AI create a personalized itinerary just for you
          </p>
        </div>

        <div className="space-y-12">
          {/* Destination Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-semibold">Where to?</h2>
            </div>
            <div className="w-full">
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  place,
                  onChange: (v) => { setPlace(v); handleInputChange('location', v) },
                  placeholder: "Search for a destination...",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      padding: '4px',
                      borderRadius: '0.5rem',
                      border: '1px solid #e2e8f0'
                    })
                  }
                }}
              />
            </div>
          </section>


        {/* noofDays Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold">How long?</h2>
          </div>
          <Input
            type="number"
            placeholder="Number of days"
            className="max-w-xs text-lg p-6"
            onChange={(e) => handleInputChange('noofDays', e.target.value)}
          />
        </section>

        {/* Budget Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Plane className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold">What's your budget?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SelectBudgetOptions.map((option) => (
              <Card
                key={option.id}
                className={`
                  cursor-pointer
                  transition-all noofDays-300
                  transform hover:scale-105
                  hover:shadow-xl
                  ${selectedBudget === option.id
                    ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50'
                    : 'hover:border-blue-200 hover:bg-gray-50'
                  }
                `}
                onClick={() => handleBudgetSelect(option)}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-4xl">{option.icon}</div>
                  <h3 className="font-semibold text-xl">{option.title}</h3>
                  <p className="text-gray-500 text-sm">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Travel Type Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold">Who's traveling?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SelectTravelList.map((option) => (
              <Card
                key={option.id}
                className={`
                  cursor-pointer
                  transition-all noofDays-300
                  transform hover:scale-105
                  hover:shadow-xl
                  ${selectedTravelType === option.id
                    ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50'
                    : 'hover:border-blue-200 hover:bg-gray-50'
                  }
                `}
                onClick={() => handleTravelTypeSelect(option)}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-4xl">{option.icon}</div>
                  <h3 className="font-semibold text-lg">{option.title}</h3>
                  <p className="text-gray-500 text-sm">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Button
            onClick={OnGenerateTripPlan}
            className="w-full py-6 text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
            size="lg"
            disabled={loading}
          >
            Generate My Trip Plan
          </Button>

          <Dialog open={openDialog} onOpenChange={setOpenDialog} >
                 <DialogContent className="justify-center mt-auto sm:mx-auto">
                   <DialogHeader>
                     <DialogTitle className="text-center">
                       <img src="/logo.svg" alt="Logo" className="h-12 mx-auto mb-4" />
                       Welcome to VoyageAI
                     </DialogTitle>
                     <DialogDescription className="text-center space-y-4">
                       <p className="text-gray-600">Sign in with your Google account to start planning your next adventure</p>
                       <Button 
                         className="w-full flex items-center justify-center gap-2" 
                         disabled={loading}
                         onClick={() => Login()}
                       >
                         <FcGoogle className="h-5 w-5" />
                         {loading ? 'Signing in...' : 'Sign in with Google'}
                       </Button>
                     </DialogDescription>
                   </DialogHeader>
                 </DialogContent>
               </Dialog>
        </div>
      </div>
    </>
  );
}

export default CreateTrip;