import React from 'react';
import SignIn from '../Authentication/GoogleAuth';
import { AuthProvider } from '../Auth';

function Navigation() {
  return (
    <AuthProvider>
      <nav className="flex items-center justify-between p-3 bg-gray-400 text-white">
        <div className="flex items-center">
          {/* Logo */}
          <a href="/" className="block">
            <img src={require('../../Assests/Image/BarbieLogo.png')} alt="Logo" className="h-8 w-8 rounded-full mr-3 border border-white" />
          </a>

          {/* Navigation Links */}
          <NavLink href="/emi" text="EMI-calc" />
          <NavLink href="/admin" text="Admin" />
        </div>

        {/* Sign In Button */}
        <SignIn />
      </nav>
    </AuthProvider> 
  );
}

const NavLink = ({ href, text }) => (
  <a href={href} className="mr-4 text-lg font-bold">{text}</a>
);

export default Navigation;
