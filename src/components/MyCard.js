import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import { BsFillBuildingsFill, BsBuildingFillUp } from 'react-icons/bs';
import { FaHandHoldingDollar } from 'react-icons/fa6';

const Card = ({ title, description, icon }) => {
    const navigate = useNavigate();

    const handleApplyClick = () => {
        navigate('/apply');
    };

    const renderIcon = () => {
        switch (icon) {
            case 'home':
                return <FaHome className="text-3xl text-teal-400 absolute top-5 right-5" />;
            case 'rupee':
                return <FaHandHoldingDollar className="text-4xl text-green-400 absolute top-5 right-5" />;
            case 'business':
                return <BsFillBuildingsFill className="text-3xl text-teal-400 absolute top-5 right-5" />;
            case 'lap':
                return <BsBuildingFillUp className="text-3xl text-teal-300 absolute top-5 right-5" />;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-sm w-80 mx-auto bg-white shadow-lg rounded-2xl mt-3 overflow-hidden mb-3 text-center transition-transform transform hover:scale-105">
            <div className="px-6 py-4 relative">
                {renderIcon()}
                <div className="mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                </div>
                <p className="text-gray-700 text-base">{description}</p>
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

const CardList = () => {
    const cardsData = [
        { title: 'Personal loan', description: 'Get personal loan at low interest within hours', icon: 'rupee' },
        { title: 'Home loan', description: 'choose from lowest interest available from dream home ', icon: 'home' },
        { title: 'Business Loan', description: 'Get business loan at best interest rate and expand your business ', icon: 'business' },
        { title: 'Loan against loan', description: 'get liquidity against your property at best interest rate ', icon: 'lap' },
    ];

    return (
        <div className="flex flex-wrap justify-center">
            {cardsData.map((card, index) => (
                <Card key={index} title={card.title} description={card.description} icon={card.icon} />
            ))}
        </div>
    );
};

export default CardList;
