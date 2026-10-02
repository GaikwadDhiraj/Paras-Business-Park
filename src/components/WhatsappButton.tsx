import { useEffect, useState } from 'react';
import './WhatsAppButton.css'; // Make sure this file includes your provided CSS

const WhatsAppButton = () => {
  const [showNotification, setShowNotification] = useState(false);

  // Your WhatsApp configurations
  const phoneNumber = '+918888466667'; // Replace with your phone number
  const message = 'Hello, I would like to enquire about Paras Business Park.'; // Replace with your predefined message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  // Show notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 7000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className='whatsapp-container'>
      <a
        href={whatsappUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='whatsapp-button'
      >
        <img
          src='/gallary/WhatsApp.svg'
          alt='WhatsApp'
          className='whatsapp-icon'
        />
        {/* Notification Badge */}
        {showNotification && <span className='notification-badge'>1</span>}
      </a>
    </div>
  );
};

export default WhatsAppButton;
