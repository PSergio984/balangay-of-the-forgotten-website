import React from 'react';

interface AncientScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

const AncientScrollContainer: React.FC<AncientScrollContainerProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`relative w-full bg-[#F0F9FF] py-16 scroll-mask ${className}`}
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {children}
      </div>
      
      {/* 
        Note: The 'scroll-mask' utility in globals.css provides the ragged edges.
        The inline style provides the smooth fade at top/bottom for transitions.
      */}
    </div>
  );
};

export default AncientScrollContainer;
