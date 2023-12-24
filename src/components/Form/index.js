import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../Authentication/firebase.js';
import predefinedLoanAmounts from '../../constants/LoanAmount';
import predefinedCities from '../../constants/Cities';

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

function Apply() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    loanAmount: '',
    email: '',
    monthlyIncome: '',
    incomeSource: '',
    city: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContinue = () => {
    if (step === 1 && formData.name.trim() === '') return; // Validation for Name field
    if (step === 2 && formData.mobileNumber.trim().length < 10) return; // Validation for Mobile Number length
    // Add more validations for other steps if needed

    setStep(step + 1);
  };

  const handlePrevStep = () => setStep(step - 1);

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 mb-4 w-full"
              placeholder="Enter your full name"
            />
            {formData.name.trim() !== '' && (
              <button onClick={handleContinue} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                Continue
              </button>
            )}
          </>
        );
      case 2:
        return (
          <>
            <label>Mobile Number:</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 mb-4 w-full"
              placeholder="Enter your mobile number"
            />
            <div className="flex justify-between">
              {step > 1 && (
                <button onClick={handlePrevStep} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/3">
                  Previous
                </button>
              )}
              {formData.mobileNumber.trim().length >= 10 && (
                <button onClick={handleContinue} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-2/3">
                  Continue
                </button>
              )}
            </div>
          </>
        );
      // Handle other steps similarly
      default:
        return (
          <>
            <h2>Thank You!</h2>
            <p>Your loan application has been submitted successfully.</p>
          </>
        );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="apply-container p-8 bg-gray-200 rounded shadow-lg w-96">
        {renderFormStep()}
      </div>
    </div>
  );
}

export default Apply;
