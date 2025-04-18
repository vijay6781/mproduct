import React from "react";
import PropTypes from "prop-types";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../Authentication/firebase";
import { useNavigate, useLocation } from "react-router-dom";

const Profile = ({ imageUrl, name, email, imageSize = "20" }) => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };
  return (
    <div className="w-96 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-8">
        <div className="flex items-center space-x-6">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <img
              className={`h-${imageSize} w-${imageSize} rounded-full object-cover border-2 border-gray-200 shadow-sm`}
              src={imageUrl || "https://via.placeholder.com/150"}
              alt={`${name}'s profile`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
            {/* Online status dot */}
            <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-white"></span>
          </div>

          {/* Name and Email */}
          <div className="flex-1 min-w-0">
            <p className="text-xl font-semibold text-gray-900 truncate">
              {name}
            </p>
            <p className="text-sm text-gray-600 truncate">{email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 mb-4 border-t border-gray-200"></div>

        {/* Logout Button */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center px-5 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
};

Profile.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  imageSize: PropTypes.oneOf(["12", "14", "16", "20", "24"]),
  onLogout: PropTypes.func.isRequired,
};

export default Profile;
