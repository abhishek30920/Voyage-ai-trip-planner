import { toast } from "@/hooks/use-toast"
import { db } from "@/service/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Hotels from "./components/Hotels"
import PlacestoVisit from "./components/PlacestoVisit"
import Footer from "./components/Footer"
import InformSection from './components/InformSection'

function ViewTrip() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (tripId) {
      GetTripData()
    }
  }, [tripId])

  const GetTripData = async () => {
    try {
      setLoading(true)
      const docRef = doc(db, 'AItrips', tripId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        setTrip(docSnap.data())
      } else {
        toast({
          title: "Trip not found",
          description: "We couldn't find the trip you're looking for.",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error loading trip",
        description: "There was a problem loading your trip details.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <div className="space-y-8 md:space-y-12">
            {/* Information Section */}
            <section className="bg-white rounded-lg shadow-sm">
              <InformSection trip={trip} />
            </section>

            {/* Recommended Hotels */}
            <section className="bg-white rounded-lg shadow-sm">
              <Hotels trip={trip} />
            </section>

            {/* Itinerary */}
            <section className="bg-white rounded-lg shadow-sm">
              <PlacestoVisit trip={trip} />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  )
}

export default ViewTrip