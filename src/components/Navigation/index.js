import React from 'react';
import SignIn from '../Authentication/GoogleAuth';
import { AuthProvider } from '../Auth';

function Navigation() {
  return (
    <AuthProvider> {/* Wrap your component with AuthProvider */}
      <nav className="flex flex-wrap items-center justify-center md:justify-end py-2.5 bg-gradient-to-r from-blue-300 to-blue-300">
        <a href="/" className="mr-4 mb-2 md:mb-0 text-black font-bold text-lg md:text-2xl">Home</a>
        <a href="/About" className="mr-4 mb-2 md:mb-0 text-black font-bold text-lg md:text-2xl">About</a>
        <a href="/admin" className="mr-4 mb-2 md:mb-0 text-black font-bold text-lg md:text-2xl">Admin</a>
        <SignIn/> {/* Render the SignIn component here */}
      </nav>
    </AuthProvider> 
  );
}

export default Navigation;
