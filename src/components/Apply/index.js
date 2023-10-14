import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './Apply.css';
import { useNavigate } from 'react-router-dom';
import { firebaseConfig } from '../Authentication/firebase.js'

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore(); // Get a reference to Firestore

function Apply() {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false); // Track form submission
  const [mobileError, setMobileError] = useState('');
  const [loanAmountError, setLoanAmountError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [incomeSource, setIncomeSource] = useState('');

  const navigate = useNavigate(); // Get the history object from React Router

  const predefinedLoanAmounts = [
    '1 Lakh',
    '2 Lakhs',
    '3 Lakhs',
    '4 Lakhs',
    '5 Lakhs',
    '6 Lakhs',
    '7 Lakhs',
    '8 Lakhs',
    '9 Lakhs',
    '10 Lakhs',
    '20 Lakhs',
    '30 Lakhs',
    '40 Lakhs',
    '50 Lakhs',
    '60 Lakhs',
    '70 Lakhs',
    '80 Lakhs',
    '90 Lakhs',
    '1 Crore'
];

  // Filter the predefined loan amounts based on user input
  const filteredLoanAmounts = predefinedLoanAmounts.filter(amount =>
    amount.toString().includes(loanAmount)
  );

  const handleApply = async () => {
    try {
      // Reset errors
      setMobileError('');
      setLoanAmountError('');
      setEmailError('');

      if (!mobileNumber) {
        setMobileError('Please fill in the Mobile Number');
        return;
      }
      if (!loanAmount) {
        setLoanAmountError('Please fill in the loan amount');
        return;
      }
      if (!email) {
        setEmailError('Please fill in the Email Address');
        return;
      }

      // Create a document in Firestore with the loan application data
      await firestore.collection('loan').add({
        name,
        mobileNumber,
        loanAmount: parseFloat(loanAmount),
        email,
        incomeSource,
        Date: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setSubmitted(true); // Mark form as submitted
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // Use useEffect to redirect after 3 seconds when submitted becomes true
  useEffect(() => {
    if (submitted) {
      const redirectTimeout = setTimeout(() => {
        navigate('/'); // Redirect to home page
      }, 3000); // Wait for 3 seconds before redirecting

      return () => clearTimeout(redirectTimeout);
    }
  }, [submitted, navigate]);

  return (
    <div className="flex  items-center justify-center h-screen bg-gradient-to-b from-grey-400 to-blue-500">
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
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="apply-input"
            />
            {loanAmountError && <div className="error-message">{loanAmountError}</div>}

            {loanAmount.length > 0 && filteredLoanAmounts.length > 0 && (
        <div className="loan-amount-suggestions text-white">
          <ul>
            {filteredLoanAmounts.map((amount, index) => (
              <li key={index} onClick={() => setLoanAmount(amount)}>
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
