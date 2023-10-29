import React, { useState } from 'react';

function EMIcalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [interest, setInterest] = useState(10);
  const [tenure, setTenure] = useState(12);

  const r = interest / (12 * 100);
  const n = tenure;
  const emiValue = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const interestValue = emiValue * n - principal;
  const emi = Math.round(emiValue);

  const handlePrincipalChange = (e) => {
    const newPrincipal = parseInt(e.target.value);
    setPrincipal(newPrincipal);
  };

  const handleInterestChange = (e) => {
    const newInterest = parseFloat(e.target.value);
    setInterest(newInterest);
  };

  const handleTenureChange = (e) => {
    const newTenure = parseInt(e.target.value);
    setTenure(newTenure);
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-2xl mb-4 font-bold text-center text-green-700">EMI Calculator</h1>
      <div className="flex flex-wrap justify-between mb-4">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Principal: ₹{principal.toLocaleString()}
          </label>
          <input
            type="range"
            min="10000"
            max="5000000"
            step="10000"
            value={principal}
            onChange={handlePrincipalChange}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Interest: {interest}%
          </label>
          <input
            type="range"
            min="5"
            max="20"
            step="0.5"
            value={interest}
            onChange={handleInterestChange}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tenure: {tenure} months
          </label>
          <input
            type="range"
            min="6"
            max="60"
            step="6"
            value={tenure}
            onChange={handleTenureChange}
            className="w-full"
          />
        </div>
      </div>

      <p className="mt-4 text-center text-2xl font-bold">EMI: ₹{emi.toLocaleString()}</p>
    </div>
  );
}

export default EMIcalculator;
