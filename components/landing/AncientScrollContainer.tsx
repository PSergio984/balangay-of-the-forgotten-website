import React from 'react';

interface AncientScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

const AncientScrollContainer: React.FC<AncientScrollContainerProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`relative z-20 w-full bg-[#F0F9FF] py-16 scroll-mask ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {children}
      </div>
      
      {/* 
        Note: The 'scroll-mask' utility in globals.css provides both the 
        ragged edges (top/bottom) and the smooth fade for transitions.
      */}
    </div>
  );
};

export default AncientScrollContainer;
