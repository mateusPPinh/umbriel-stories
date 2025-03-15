import React, { createContext, useContext, useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveDeviceContextType {
  deviceType: DeviceType;
}

const ResponsiveDeviceContext = createContext<ResponsiveDeviceContextType>({
  deviceType: 'desktop'
});

export const ResponsiveDeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResponsiveDeviceContext.Provider value={{ deviceType }}>
      {children}
    </ResponsiveDeviceContext.Provider>
  );
};

export const useResponsiveDevice = () => {
  const context = useContext(ResponsiveDeviceContext);
  return context;
}; 