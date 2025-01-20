import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-gradient-xy">
        {/* Animated circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center px-8 lg:px-32 text-center space-y-8 mt-14 lg:mt-32">
        {/* Heading */}
        <img className="size-52 drop-shadow-lg" src="../../../../public/logo.svg" alt="Logo" />
        <h1 className="font-extrabold text-[40px] lg:text-[60px] leading-tight text-[#1A202C] drop-shadow-sm">
          Turn your travel dreams into plans—
          <span className="text-blue-600 animate-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            effortlessly.
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg lg:text-xl max-w-3xl backdrop-blur-sm bg-white/30 p-6 rounded-lg">
          Your personal AI trip planner—creating custom itineraries tailored to your interests, preferences, and budget. 
          Explore smarter, travel better, and make every journey unforgettable.
        </p>

        {/* Call-to-Action Button */}
        <Link to="/create-trip">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg shadow-lg font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            Start Planning Now
          </button>
        </Link>

        {/* Screenshot Image */}
        <div className="mt-12 transform hover:scale-[1.02] transition-transform duration-300">
          <img 
            src="/public/dashboard.png" 
            alt="App Screenshot" 
            className="rounded-xl shadow-xl border border-gray-200 size-210 backdrop-blur-sm bg-white/30"
          />
        </div>
      </div>
    </div>
  );
};

// Add these styles to your global CSS or Tailwind config
const style = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  
  @keyframes gradient-xy {
    0%, 100% { background-size: 400% 400%; background-position: left top; }
    50% { background-size: 200% 200%; background-position: right bottom; }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animate-gradient-xy {
    animation: gradient-xy 15s ease infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }

  .animate-text {
    background-size: 200% auto;
    animation: textShine 5s linear infinite;
  }

  @keyframes textShine {
    to {
      background-position: 200% center;
    }
  }
`;

export default Hero;