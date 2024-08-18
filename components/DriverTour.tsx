'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Driver, driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import '../lib/styles/driver-js.css';
import { homeTourSteps } from '@/lib/constants/tourSteps';
import { useTourState } from '@/lib/hooks/useTourState';
import useAnalytics from '@/lib/hooks/useAnalytics';
import useViewPort from '@/lib/hooks/useViewPort';
import { useMobileNavbar } from '@/lib/providers/MobileNavbarProvider';

const DriverTour = () => {
  const shouldShowTour = useTourState();
  const { trackEvent } = useAnalytics();
  const { isMobile } = useViewPort();
  const { changeNavBar } = useMobileNavbar();
  const tourStartedRef = useRef(false);

  const mobileOpenAndCloseNav = useCallback((button: 'prev' | 'next', driverObj: Driver) => {
    const activeIndex = driverObj.getActiveIndex() ?? 0;
    const prevConditions = [2, 4, 5];
    const nextConditions = [1, 3, 4];

    if ((button === 'prev' && prevConditions.includes(activeIndex)) ||
      (button === 'next' && nextConditions.includes(activeIndex))) {
      changeNavBar();
    }
  }, [changeNavBar]);

  useEffect(() => {
    if (shouldShowTour && !tourStartedRef.current) {

      tourStartedRef.current = true;

      const driverObj = driver({
        onPrevClick: () => {
          trackEvent({
            action: `onboarding_highlight_previous`,
            event_category: 'button_click',
            value: { step: driverObj.getActiveIndex() },
          });
          if(isMobile) mobileOpenAndCloseNav('prev', driverObj);
          setTimeout(() => driverObj.movePrevious(), 100);
        },
        onNextClick: () => {
          trackEvent({
            action: `onboarding_highlight_next`,
            event_category: 'button_click',
            value: { step: driverObj.getActiveIndex() },
          });
          if(isMobile) mobileOpenAndCloseNav('next', driverObj);
          setTimeout(() => driverObj.moveNext(), 100);
        },
        popoverClass: 'driverjs-theme',
        showProgress: true,
        allowClose: false,
        steps: [...homeTourSteps],
      });

      if(isMobile) {
        changeNavBar();
      }

      setTimeout(() => driverObj.drive(), 300)
      localStorage.setItem('hasSeenTour', 'true');
      return () => {
        driverObj.destroy();
      };
    }
  }, [shouldShowTour, isMobile, changeNavBar, trackEvent, mobileOpenAndCloseNav]);

  return null;
};

export default DriverTour;
