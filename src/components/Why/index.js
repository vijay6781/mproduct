import React from 'react';
import { FaHandshake, FaMoneyBillAlt, FaClock } from 'react-icons/fa';

const WhyChooseBarbieLoan = () => {
  return (
    <div className="bg-gradient-to-r from-teal-400 via-blue-600 to-green-600 text-white p-8 text-center relative">
      <h2 className="text-3xl font-bold mb-4">Why Choose BarbieLoan.com?</h2>
      <div className="flex flex-col lg:flex-row justify-center gap-6">
        <div className="flex-1 bg-white bg-opacity-80 p-6 rounded-lg transition-transform transform hover:scale-105">
          <FaHandshake className="text-5xl mx-auto mb-4 text-teal-400" />
          <h3 className="text-2xl font-bold mb-2 text-teal-400">Low Interest Rates</h3>
          <p className="text-lg font-bold mb-2 text-teal-300">We provide loans with some of the lowest interest rates in the industry.</p>
        </div>
        <div className="flex-1 bg-white bg-opacity-80 p-6 rounded-lg transition-transform transform hover:scale-105">
          <FaMoneyBillAlt className="text-5xl mx-auto mb-4 text-blue-400" />
          <h3 className="text-2xl font-bold mb-2 text-blue-400">Easy Application Process</h3>
          <p className="text-lg font-bold mb-2 text-blue-300">Our application process is simple and hassle-free, making it easy for you to get the loan you need.</p>
        </div>
        <div className="flex-1 bg-white bg-opacity-80 p-6 rounded-lg transition-transform transform hover:scale-105">
          <FaClock className="text-5xl mx-auto mb-4 text-indigo-400" />
          <h3 className="text-2xl font-bold mb-2 text-indigo-400">Fast Approval</h3>
          <p className="text-lg font-bold mb-2 text-indigo-300 ">We understand the urgency of your financial needs. That's why we offer fast approval times.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseBarbieLoan;
