import React from 'react';
import { useAuth } from '../Auth'; // Update the path to your AuthContext
import { signInWithPopup, signOut } from 'firebase/auth'; // Import Firebase authentication methods
import { auth, provider } from './firebase';

const SignIn = () => {
  const { user, isLoading } = useAuth(); // Access user and isLoading from the context

  const handleSignIn = async () => {
    try {
      // Use Firebase authentication to sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed in:', user);
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      // Use Firebase authentication to sign out
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {user ? (
            <div className="relative">
              {/* Render UI for authenticated user */}
              <button onClick={handleSignOut} className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4  mr-2 rounded-full">
                log out
              </button>
            </div>
          ) : (
            <div>
              {/* Render UI for non-authenticated user */}
              <button onClick={handleSignIn} className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4  mr-2 rounded-full">
                log in
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SignIn;
