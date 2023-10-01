import React from 'react';
import { FaHome, FaRupeeSign,FaBusinessTime } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import { BsFillBuildingsFill,BsBuildingFillUp } from 'react-icons/bs';


const Card = ({ title, description, icon }) => {
    const navigate =useNavigate();
  const handleApplyClick = () => {
    navigate('/apply');
    // Write your apply button click logic here
  };

  const renderIcon = () => {
    switch (icon) {
      case 'home':
        return <FaHome className="text-xl absolute top-5 right-5" />;
      case 'rupee':
        return <FaRupeeSign className="text-xl absolute top-5 right-5" />;
      case 'business':
        return <BsFillBuildingsFill className="text-xl absolute top-5 right-5" />;
      case 'lap':
        return <BsBuildingFillUp className="text-xl absolute top-5 right-5" />;  
      default:
        return null;
    }
  };

  return (
    <div className="max-w-sm w-80 mx-auto bg-white shadow-lg rounded-2xl mt-5 overflow-hidden mb-4 text-center">
      <div className="px-6 py-4 relative">
        {renderIcon()}
        <div className="mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4 flex justify-center">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
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
    { title: 'Home loan', description: 'Get home loan at low interest rate ', icon: 'home' },
    { title: 'Business Loan', description: 'Get business loan with low interst rate', icon: 'business' },
    { title: 'LAP loan', description: 'Loan agains property with low interest rate ', icon: 'lap' },
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
