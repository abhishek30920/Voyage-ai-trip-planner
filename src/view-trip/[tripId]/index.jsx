import { toast } from "@/hooks/use-toast"
import { db } from "@/service/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import InformSection from "./components/informSection"
import Hotels from "./components/Hotels"
import PlacestoVisit from "./components/PlacestoVisit"
import Footer from "./components/Footer"


function ViewTrip() {
  const { tripId } = useParams()
  const [trip,setTrip]=useState(null)



  useEffect(() => {

    tripId && GetTripData()
  }, [tripId])

  // use to get trip information from firebase
  const GetTripData = async () => {
    //fetch the trip data from the server using the tripId
    const docRef = doc(db, 'AItrips', tripId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setTrip(docSnap.data())
      console.log("Document data:", docSnap.data())
    } else {
      console.log("No such document")
      toast.error("No trip found")
    }
  }
  console.log(trip)
  return (
    <div>
    <div className="p-10 md:px-20 lg:px-40 xl:px-56 ">
     {/* Information Section  */}
      <InformSection trip={trip}/>

     {/* recommended hotels */}
      <Hotels trip={trip}/>

     {/* iternary */}
      <PlacestoVisit trip={trip}/>

      {/* footer */}
     
    </div>
    <div>
    <Footer/>
    </div>
    </div>
  )
}

export default ViewTrip
