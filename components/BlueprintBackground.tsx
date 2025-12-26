
import React from 'react';

const BlueprintBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#f8fafc]"></div>
      <div className="absolute inset-0 blueprint-grid opacity-60"></div>
      <div className="absolute inset-0 blueprint-subgrid opacity-40"></div>
      
      {/* Subtle architectural accents */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <line x1="5%" y1="0" x2="5%" y2="100%" stroke="#2563eb" strokeWidth="1" />
        <line x1="0" y1="10%" x2="100%" y2="10%" stroke="#2563eb" strokeWidth="1" />
        <circle cx="5%" cy="10%" r="6" fill="#2563eb" />
        
        <path d="M 900 100 L 950 100 L 950 150" fill="none" stroke="#2563eb" strokeWidth="1" />
        <rect x="880" y="850" width="80" height="40" fill="none" stroke="#2563eb" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default BlueprintBackground;
