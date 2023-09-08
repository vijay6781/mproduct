import React from 'react';

const LoanCard = ({ title, description }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4 mb-8">
            <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2 text-center">{title}</h2>
                {/* <div className="flex justify-center mb-4">
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16h-2v-2h2v2zm0-4h-2V7h2v7z"/>
                    </svg>
                </div> */}
                <p className="text-gray-700 text-base text-center">{description}</p>
            </div>
            <div className="px-6 pb-4 text-center">
                <button className="btn">Apply</button>
            </div>
        </div>
    );
}

export default LoanCard;
