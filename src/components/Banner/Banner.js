import React from 'react';
import './Banner.css'; // Import the CSS file for styling

const Banner = ({ imageSrc, text, text1 }) => {
  const bannerStyle = {
    backgroundColor: '#004d40', // Dark green color
    backgroundImage: `url(${imageSrc})`,
    filter: 'brightness(0.7) contrast(1.2) hue-rotate(45deg)', // Apply filters to change the photo color
    
  };

  return (
    <div className="banner-container">
      {/* Banner image */}
      <div className="w-full h-64 md:h-96 bg-center bg-cover" style={bannerStyle} />

      {/* Banner text */}
      <div className="banner-text">
        {text}
      </div>
      <div className="banner-text1">
        {text1}
      </div>
    </div>
  );
};

export default Banner;
