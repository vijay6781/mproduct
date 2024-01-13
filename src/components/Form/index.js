import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import { firebaseConfig } from '../Authentication/firebase.js';
import predefinedLoanAmounts from '../../constants/LoanAmount';
import predefinedCities from '../../constants/Cities';
import { FaGoogle } from "react-icons/fa";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

function Apply() {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [email, setEmail] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [loanAmountError, setLoanAmountError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [incomeError, setIncomeError] = useState('');
  const [incomeSource, setIncomeSource] = useState('');
  const [selectedLoanAmount, setSelectedLoanAmount] = useState('');
  const [filteredLoanAmounts, setFilteredLoanAmounts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [user, setUser] = useState(null); // State to hold user data

  const navigate = useNavigate();

  const handleLoanAmountChange = (input) => {
    const inputValue = input.toLowerCase();
    const filtered = inputValue
      ? predefinedLoanAmounts.filter(
          (amount) => amount.toLowerCase().startsWith(inputValue)
        )
      : [];
    setFilteredLoanAmounts(filtered);
    setSelectedLoanAmount(input);
  };

  // ... (Other handle functions)
  const handleLoanAmountSelect = (amount) => {
    setSelectedLoanAmount(amount);
    setFilteredLoanAmounts([]);
  };

  const handleCityChange = (input) => {
    const inputValue = input.toLowerCase();
    const filtered = inputValue
      ? predefinedCities.filter(
          (city) => city.toLowerCase().startsWith(inputValue)
        )
      : [];
    setFilteredCities(filtered);
    setSelectedCity(input);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setFilteredCities([]);
  };

  const handleApply = async () => {
    try {
      setMobileError('');
      setLoanAmountError('');
      setEmailError('');
      setIncomeError('');

      if (!mobileNumber) {
        setMobileError('Please fill in the Mobile Number');
        return;
      }
      if (!selectedLoanAmount) {
        setLoanAmountError('Please fill in the loan amount');
        return;
      }
      // if (!email) {
      //   setEmailError('Please fill in the Email Address');
      //   return;
      // }
      if (!monthlyIncome) {
        setIncomeError('Please fill in the Monthly Income');
        return;
      }

      await firestore.collection('loan').add({
        name:user.displayName,
        mobileNumber,
        loanAmount: selectedLoanAmount,
        email:user.email,
        incomeSource,
        monthlyIncome,
        city: selectedCity,
        Date: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setSubmitted(true);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      setUser(result.user);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign-Out Error:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (submitted) {
      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [submitted, navigate]);

  return (
<div className={`apply-container ${submitted ? 'submitted' : ''}`}>
      {/* {!user ? (
        <button onClick={handleGoogleSignIn} className="google-sign-in-button">
          Sign in with Google
        </button>
      ) : ( */}
        <>
          {!submitted ? (
            <div className="apply-section">
              <h2 className="apply-title">Apply for a Loan</h2>
              <label className="apply-label">Name:</label>
            <input
              type="text"
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="apply-input"
              required
              // disabled
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
            <label className="apply-label">Loan Amount:</label>
            <input
              type="text"
              value={selectedLoanAmount}
              onChange={(e) => handleLoanAmountChange(e.target.value)}
              className="apply-input"
              placeholder=' Rs in Lakh'
            />
            {loanAmountError && (
              <div className="error-message">{loanAmountError}</div>
            )}

            {selectedLoanAmount.length > 0 && filteredLoanAmounts.length > 0 && (
              <div className="loan-amount-suggestions text-black">
                <ul>
                  {filteredLoanAmounts.map((amount, index) => (
                    <li key={index} onClick={() => handleLoanAmountSelect(amount)}>
                      {amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <label className="apply-label">Email Id:</label>
            <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="apply-input"
               required
              //  disabled
            />
            {/* {emailError && <div className="error-message">{emailError}</div>} */}
            

            <label className="apply-label">Income Source:</label>
            <select
              value={incomeSource}
              onChange={(e) => setIncomeSource(e.target.value)}
              className="apply-input"
            >
              <option value="">Select...</option>
              <option value="salary">Salary</option>
              <option value="business">Business</option>
            </select>
            <label className="apply-label">Monthly Income:</label>
            <input
              type="text"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="apply-input"
              required
            />
            {incomeError && <div className="error-message">{incomeError}</div>}
            
            <label className="apply-label">City:</label>
            <input
              type="text"
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="apply-input"
              placeholder="Enter City"
            />
            {selectedCity.length > 0 && filteredCities.length > 0 && (
              <div className="city-suggestions text-black">
                <ul>
                  {filteredCities.map((city, index) => (
                    <li key={index} onClick={() => handleCitySelect(city)}>
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            )}

              <button onClick={handleApply} className="apply-button">
                Apply
              </button>
            </div>
          ) : (
            <div className="thank-you">
              <h2 className="apply-title">Thank You!</h2>
              <p>Your loan application has been submitted successfully.</p>
            </div>
          )}
        </>
      {/* )} */}
    </div>
  );
}

export default Apply;
