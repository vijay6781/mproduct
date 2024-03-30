import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useNavigate } from 'react-router-dom';
import { firebaseConfig } from '../Authentication/firebase.js';

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

function Gst() {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [state, setState] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [countdown, setCountdown] = useState('24 hr 00 minutes and 00 sec'); // Initial countdown value

  const navigate = useNavigate();

  const statesOfIndia = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  const handleApply = async () => {
    try {
      setMobileError('');

      if (!mobileNumber) {
        setMobileError('Please fill in the Mobile Number');
        return;
      }

      await firestore.collection('website').add({
        name,
        mobileNumber,
        state,
        Date: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setSubmitted(true);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set the countdown to start from midnight

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = midnight - now;

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${hours} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} ||  only on ₹ 499`);

      if (distance < 0) {
        clearInterval(interval);
        setCountdown('Offer expired'); // Set message when countdown reaches zero
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let redirectTimeout;
    if (submitted) {
      redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 3000);
    }

    return () => clearTimeout(redirectTimeout);
  }, [submitted, navigate]);

  const handleSubmitAgain = () => {
    setSubmitted(false);
    setName('');
    setMobileNumber('');
    setState('');
  };

  return (
    <div>
      <div className="banner-container bg-gradient-to-b from-red-800 to-blue-800 text-white text-center py-4">
        Offer Ends in {countdown}
      </div>
      <div className="flex items-center justify-center ml-1 mr-1 mb-2 mt-2 h-screen">
        <div className={`apply-container ${submitted ? 'submitted' : ''}`}>
          {submitted ? (
            <div className="thank-you">
              <h2 className="apply-title">Thank You!</h2>
              <p>Your GST registration application has been submitted successfully.</p>
              <button onClick={handleSubmitAgain} className="apply-button">
                Apply Again
              </button>
            </div>
          ) : (
            <>
              <h2 className="apply-title">Apply for GST Registration</h2>
              <label className="apply-label">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="apply-input"
                required
              />
              <label className="apply-label">Mobile Number:</label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="apply-input"
                required
              />
              {mobileError && <div className="error-message">{mobileError}</div>}

              <label className="apply-label">State:</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="apply-input"
                required
              >
                <option value="">Select State</option>
                {statesOfIndia.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>

              <button onClick={handleApply} className="apply-button">
                Apply
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gst;
