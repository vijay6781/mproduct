import React from 'react';
import './style.css'
const WhatsAppIcon = () => {
    const customWhatsAppLink = 'https://wa.me/message/46PUNEQYUUPAK1'; // Your custom WhatsApp link
  
    const handleWhatsAppClick = () => {
      window.open(customWhatsAppLink, '_blank');
    };
  
    return (
      <div className="whatsapp-icon" onClick={handleWhatsAppClick}>
        <img src={require('./whatsapp-icon.png')} alt="WhatsApp" />
      </div>
    );
  };
  
  export default WhatsAppIcon;
  