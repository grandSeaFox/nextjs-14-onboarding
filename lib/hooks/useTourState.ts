'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/providers/AuthProvider';

export const useTourState = () => {
  const { isLoading } = useAuth();
  const [shouldShowTour, setShouldShowTour] = useState(false);

  useEffect(() => {
    const checkTourState = () => {
      const hasSeenTour = localStorage.getItem('hasSeenTour');
      setShouldShowTour(!hasSeenTour && !isLoading);
    };

    checkTourState();

    window.addEventListener('storage', checkTourState);

    return () => {
      window.removeEventListener('storage', checkTourState);
    };
  }, [isLoading]);

  return shouldShowTour;
};