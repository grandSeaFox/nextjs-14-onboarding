'use client';
import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import '../lib/styles/driver-js.css';
import { homeTourSteps } from '@/lib/constants/tourSteps';
import { useTourState } from '@/lib/hooks/useTourState';
import useAnalytics from '@/lib/hooks/useAnalytics';
import { useAuth } from '@/lib/providers/AuthProvider';

const DriverTour = () => {
  const shouldShowTour = useTourState();
  const { trackEvent } = useAnalytics();
  const { user } = useAuth();

  useEffect(() => {
    if (shouldShowTour) {
      const driverObj = driver({
        onNextClick: () => {
          trackEvent({ action: `onboarding_highlight_next`, event_category: 'button_click', value: {user_id: user?.userId, step: driverObj.getActiveIndex()} });
          driverObj.moveNext();
        },
        onPrevClick: () => {
          trackEvent({ action: `onboarding_highlight_previous`, event_category: 'button_click', value: {user_id: user?.userId, step: driverObj.getActiveIndex()} })
          driverObj.movePrevious();
        },
        popoverClass: 'driverjs-theme',
        showProgress: true,
        allowClose: false,
        steps: [
          ...homeTourSteps,
        ]
      });

      driverObj.drive();

      localStorage.setItem('hasSeenTour', 'true');

      return () => {
        driverObj.destroy();

      };
    }
  }, [shouldShowTour]);

  return null;
};

export default DriverTour;