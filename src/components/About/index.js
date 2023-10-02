import React from 'react';
import { FaStar, FaHandshake, FaMoneyBill, FaHeart } from 'react-icons/fa';

function About() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-lg">
        <div className="bg-gradient-to-r from-cyan-400 to-orange-500 bg-opacity-90 backdrop-blur-md rounded-lg p-6 text-center text-white">
          <FaStar className="text-5xl mb-4 text-yellow-400" />
          <h2 className="text-2xl font-bold mb-2">Competitive Rates</h2>
          <p>
            We provide loans at some of the most competitive interest rates in the market.
          </p>
        </div>
        <div className="bg-gradient-to-r from-cyan-400 to-orange-500 bg-opacity-90 backdrop-blur-md rounded-lg p-6 text-center text-white">
          <FaHandshake className="text-5xl mb-4 text-green-400" />
          <h2 className="text-2xl font-bold mb-2">Fair Practices</h2>
          <p>
            We believe in transparent and fair lending practices, always.
          </p>
        </div>
        <div className="bg-gradient-to-r from-cyan-400 to-orange-500 bg-opacity-90 backdrop-blur-md rounded-lg p-6 text-center text-white">
          <FaMoneyBill className="text-5xl mb-4 text-blue-400" />
          <h2 className="text-2xl font-bold mb-2">Financial Security</h2>
          <p>
            Your financial security is our utmost priority. We employ state-of-the-art security measures to safeguard your financial information.
          </p>
        </div>
        <div className="bg-gradient-to-r from-cyan-400 to-orange-500 bg-opacity-90 backdrop-blur-md rounded-lg p-6 text-center text-white">
          <FaHeart className="text-5xl mb-4 text-red-400" />
          <h2 className="text-2xl font-bold mb-2">Empowerment</h2>
          <p>
            We're not just providing loans; we're on a mission to empower you towards financial prosperity. Join us in shaping a brighter future.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
