import React, { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../Authentication/firebase";
import { useNavigate, useLocation } from "react-router-dom";

const Sign_In = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [userPhoto, setUserPhoto] = useState(localStorage.getItem("photo"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      localStorage.setItem("token", idToken);
      localStorage.setItem("photo", user.photoURL || "");

      setToken(idToken);
      setUserPhoto(user.photoURL);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setToken(null);
      setUserPhoto(null);
      navigate("/login");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 min-h-[320px] flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          {token ? "You're logged in" : "Welcome"}
        </h2>

        {token ? (
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 bg-red-400 hover:bg-red-600 text-white px-6 py-3 rounded-full transition duration-200"
          >
            <img
              src={
                "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              }
              alt="User"
              className="h-8 w-8 rounded-full border-2 border-white"
            />
            <span className="text-sm font-medium">Logout</span>
          </button>
        ) : (
          <button
            onClick={handleSignIn}
            className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-pink-500 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-6 w-6 bg-white rounded-full p-1"
            />
            <span className="text-sm font-medium">Login with Google</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sign_In;
