import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './Apply.css';
import { useNavigate } from 'react-router-dom';
import { firebaseConfig } from '../Authentication/firebase.js';
import predefinedLoanAmounts from '../../constants/LoanAmount';
import predefinedCities from '../../constants/Cities';

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

function Apply() {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [loanAmountError, setLoanAmountError] = useState('');
  const [emailError,setEmailError] = useState('');
  const [incomeSource, setIncomeSource] = useState('');
  const [selectedLoanAmount, setSelectedLoanAmount] = useState('');
  const [filteredLoanAmounts, setFilteredLoanAmounts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

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

      if (!mobileNumber) {
        setMobileError('Please fill in the Mobile Number');
        return;
      }
      if (!selectedLoanAmount) {
        setLoanAmountError('Please fill in the loan amount');
        return;
      }
      if (!email) {
        setEmailError('Please fill in the Email Address');
        return;
      }
      // if (!selectedCity) {
      //   setCityError('Please select a city');
      //   return;
      // }

      await firestore.collection('loan').add({
        name,
        mobileNumber,
        loanAmount: selectedLoanAmount,
        email,
        incomeSource,
        city: selectedCity,
        Date: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setSubmitted(true);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  useEffect(() => {
    if (submitted) {
      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [submitted, navigate]);

  return (
    <div className="flex items-center justify-center ml-1 mr-1 mb-24 h-screen bg-gradient-to-b from-grey-400 to-blue-500">
      <div className={`apply-container ${submitted ? 'submitted' : ''}`}>
        {submitted ? (
          <div className="thank-you">
            <h2 className="apply-title">Thank You!</h2>
            <p>Your loan application has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <h2 className="apply-title">Apply for a Loan</h2>
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
              <div className="loan-amount-suggestions text-white">
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
            />
            {emailError && <div className="error-message">{emailError}</div>}
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

            <label className="apply-label">City:</label>
            <input
              type="text"
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="apply-input"
              placeholder="Enter City"
            />
            {selectedCity.length > 0 && filteredCities.length > 0 && (
              <div className="city-suggestions text-white">
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
          </>
        )}
      </div>
    </div>
  );
}

export default Apply;
