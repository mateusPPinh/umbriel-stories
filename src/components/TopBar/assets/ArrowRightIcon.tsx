import React from 'react';

interface ArrowRightIconProps {
  fill?: string;
  className?: string;
}

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ fill = '#5A5A5A', className }) => {
  return (
    <svg 
      width="38" 
      height="62" 
      viewBox="0 0 38 62" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M38 31L31.7157 24.8575L6.28432 0L7.62939e-06 6.1425L25.4314 31L7.62939e-06 55.8575L6.28432 62L31.7157 37.1425L38 31Z" 
        fill={fill}
      />
    </svg>
  );
};

export default ArrowRightIcon; 