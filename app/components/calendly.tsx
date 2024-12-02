import React, { useEffect } from 'react';

const CalendlyWidget = () => {
  useEffect(() => {
    // Load Calendly widget script dynamically
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h2>Schedule an Appointment</h2>
      <div 
        className="calendly-inline-widget" 
        data-url="https://calendly.com/nkalpakis21" 
        style={{ minWidth: '320px', height: '630px' }}>
      </div>
    </div>
  );
};

export default CalendlyWidget;
