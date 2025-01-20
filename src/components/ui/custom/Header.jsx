import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogOut, Plus, Map, Menu, X } from 'lucide-react';
import axios from 'axios';

function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const GetUserProfile = async (tokenInfo) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: 'application/json'
          }
        }
      );
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: GetUserProfile,
    onError: (error) => console.error('Google login error:', error)
  });

  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <a href="/" className="flex items-center space-x-2 sm:space-x-4">
            <img className="h-8 w-auto sm:h-10" src="./logo.svg" alt="VoyageAI Logo" />
            <span className="font-bold text-lg sm:text-xl text-gray-900">VoyageAI</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <a href="/create-trip">
                  <Button variant="outline" className="rounded-full flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Trip
                  </Button>
                </a>
                <a href="/my-trips">
                  <Button variant="outline" className="rounded-full flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    My Trips
                  </Button>
                </a>
                <Popover>
                  <PopoverTrigger>
                    <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-gray-300 transition-all">
                      <img 
                        src={user.picture} 
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="py-2 px-4 border-b">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <Button 
                onClick={() => setOpenDialog(true)}
                className="rounded-full"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-10 w-10"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2">
                  <img 
                    src={user.picture} 
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <a href="/create-trip" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                    <Plus className="h-4 w-4" />
                    Create Trip
                  </a>
                  <a href="/my-trips" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                    <Map className="h-4 w-4" />
                    My Trips
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4">
                <Button 
                  onClick={() => {
                    setOpenDialog(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full rounded-full"
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              <img src="./logo.svg" alt="Logo" className="h-12 mx-auto mb-4" />
              Welcome to VoyageAI
            </DialogTitle>
            <DialogDescription className="text-center space-y-4">
              <p className="text-gray-600">Sign in with your Google account to start planning your next adventure</p>
              <Button 
                className="w-full flex items-center justify-center gap-2" 
                disabled={loading}
                onClick={() => login()}
              >
                <FcGoogle className="h-5 w-5" />
                {loading ? 'Signing in...' : 'Sign in with Google'}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;