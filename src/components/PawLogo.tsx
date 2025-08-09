import React from 'react';

interface PawLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PawLogo: React.FC<PawLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-16 h-16'
  };

  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main paw pad */}
      <ellipse cx="12" cy="16" rx="4" ry="3" />
      
      {/* Toe pads */}
      <circle cx="8" cy="10" r="2" />
      <circle cx="12" cy="8" r="2" />
      <circle cx="16" cy="10" r="2" />
      <circle cx="10" cy="12" r="1.5" />
      <circle cx="14" cy="12" r="1.5" />
    </svg>
  );
};