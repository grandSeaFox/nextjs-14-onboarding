import { useCallback } from 'react';

interface Event {
  action: string;
  event_category?: string;
  value?: Record<string, any>;
}

export type TrackEvent = (event: Event) => void;

export interface Analytics {
  trackEvent: TrackEvent;
}

const useAnalytics = (): Analytics => {
  const trackEvent = useCallback(({ action, event_category, value }: Event) => {
    (window as any).gtag('event', action, {
      event_category,
      ...value,
    });
  }, []);


  return {
    trackEvent,
  };
};

export default useAnalytics;
