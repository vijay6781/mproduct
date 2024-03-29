import React from 'react';
import { FiBriefcase } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const GstCard = () => {
    const navigate = useNavigate();

    const handleApplyClick = () => {
        navigate('/Gst');
    };

    return (
        <div className="w-80 mx-auto bg-gray shadow-lg rounded-2xl mt-4 overflow-hidden mb-4 text-center transition-transform transform hover:scale-105">
            <div className="px-6 py-4 relative">
                <FiBriefcase className="text-4xl text-green-400 absolute top-5 right-5" />
                <div className="mb-4">
                    <h2 className="text-xl font-bold">GST Registration</h2>
                </div>
                <p className="text-gray-700 text-base">Register for GST and grow your business with very nominal charge.</p>
            </div>
            <div className="px-6 py-4 flex justify-center">
                <button
                    className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleApplyClick}
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default GstCard;
