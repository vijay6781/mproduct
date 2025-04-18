import React from "react";
import { useAuth } from "../Auth";
// import { signInWithPopup, signOut } from "firebase/auth";
// import { auth, provider } from "./firebase";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      // const result = await signInWithPopup(auth, provider);
      // const user = result.user;
      // const token = await user.getIdToken();

      // localStorage.setItem("user", JSON.stringify(user));
      // localStorage.setItem("token", token);
      // localStorage.setItem("photo", user.photoURL);

      navigate("/login"); // Redirect to home
    } catch (error) {
      console.error("Sign-in error:", error.message);
    }
  };

  const myProfile = async () => {
    try {
      // await signOut(auth);
      // localStorage.clear();
      // console.log("User signed out");
      navigate("/profile");
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {user ? (
            <div className="relative">
              {/* Render UI for authenticated user */}
              <button
                onClick={myProfile}
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4  mr-2 rounded-full"
              >
                profile
              </button>
            </div>
          ) : (
            <div>
              {/* Render UI for non-authenticated user */}
              <button
                onClick={handleSignIn}
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4  mr-2 rounded-full"
              >
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
