import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'
import { Toaster } from './components/ui/toaster'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]'
import MyTrips from './my-trips'



const router=createBrowserRouter([   // First step to create routing in react app is to create a router using createBrowserRouter function
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/create-trip",
    element:<CreateTrip/>
  },
  {
    path:"/view-trip/:tripId",
   element:<ViewTrip/>
  },
  {
    path:"/my-trips",
    element:<MyTrips/>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
  <Header/>
  <Toaster/>
  <RouterProvider router={router}/>
    {/* <RouterProvider router={router}/>  // Second step is to wrap the root component with RouterProvider and pass the router object as a prop */}
    </GoogleOAuthProvider>
  </StrictMode>,
)
