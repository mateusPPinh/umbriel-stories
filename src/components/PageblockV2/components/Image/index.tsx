import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt,
  fill,
  className = '',
  ...props 
}) => {
  if (fill) {
    return (
      <img 
        src={src} 
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        loading="lazy"
        {...props}
      />
    );
  }

  return (
    <img 
      src={src} 
      alt={alt}
      className={className}
      loading="lazy"
      {...props}
    />
  );
};

export default Image; 