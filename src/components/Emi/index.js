import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

function EMIcalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [interest, setInterest] = useState(10);
  const [tenure, setTenure] = useState(12);

  const r = interest / (12 * 100);
  const n = tenure;
  const emiValue = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const interestValue = Math.round(emiValue * n - principal);
  const emi = Math.round(emiValue);
  const totalPayable = emi * n;

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

  const pieChartData = [
    { title: 'Principal', value: principal, color: '#00ff00' },
    { title: 'Interest', value: interestValue, color: '#8b008b' },
  ];

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

      <p className="text-center text-pink-700 text-xl font-bold">EMI amount: ₹{emi.toLocaleString()}</p>
      <p className="text-center text-xl font-bold">Total Interest: ₹{interestValue.toLocaleString()}</p>
      <p className="text-center text-xl font-bold">Total Payment: ₹{totalPayable.toLocaleString()}</p>

      <div className="flex justify-center">
        <PieChart
          data={pieChartData}
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          labelPosition={50}
          labelStyle={{ fill: '#fff', fontSize: '0.2em' }}
          radius={35}
        />
         <div className="flex items-center justify-center mb-4">
        <div className="bg-green-500 h-2 w-3 mr-2"></div>
        <p className="text-sm font-bold">Principal</p>
        <div className="bg-pink-500 h-2 w-3 ml-2"></div>
        <p className="text-sm font-bold">Interest</p>
      </div>

      </div>
      
    </div>
  );
}

export default EMIcalculator;
