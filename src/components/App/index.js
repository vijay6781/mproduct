import React from "react";
import Navigation from "../Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home";
import About from "../About";
import Footer from "../Footer";
import SignIn from "../Authentication/SignIn";
import SignOut from "../Authentication/SignOut";
import MyAccount from "../MyAccount/MyAccount";
import Apply from "../Apply";
import Form from "../Form";
import WhatsAppIcon from "../Whatsapp/index.js";
import SubmittedForms from "../Data/PasswordPrompt.js";
import EMICalculator from "../Emi";
import PrivacyPolicy from "../PrivacyPolicy";
import Gst from "../Gst";
import Chat from "../Chat";
import User from "../../Users/index.js";
import PrivateRoute from "../../PrivateRoute";

const App = () => {
  // 🔒 Routes that require login
  const protectedRoutes = [
    { path: "/", element: <Home /> },
    { path: "/account", element: <MyAccount /> },
    { path: "/form", element: <Form /> },
    { path: "/apply", element: <Apply /> },
    { path: "/admin", element: <SubmittedForms /> },
    { path: "/users", element: <User /> },
    { path: "/emi-calculator", element: <EMICalculator /> },
    { path: "/privacy", element: <PrivacyPolicy /> },
    { path: "/gst", element: <Gst /> },
    { path: "/chat", element: <Chat /> },
  ];

  return (
    <Router>
      <Navigation />
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/logout" element={<SignOut />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />

        {/* 🔒 Protected Routes */}
        {protectedRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PrivateRoute>{element}</PrivateRoute>}
          />
        ))}
      </Routes>
      <WhatsAppIcon />
      <Footer />
    </Router>
  );
};

export default App;
