import { useState, useEffect } from 'react';

const useViewport = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
      setIsTablet(window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches);
      setIsDesktop(window.matchMedia('(min-width: 1024px) and (max-width: 1800px)').matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isTablet, isDesktop };
};

export default useViewport;
