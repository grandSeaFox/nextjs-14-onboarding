import { useCallback } from 'react';

interface PageView {
  page_title: string;
  page_path?: string;
  context?: string;
  value?: Record<string, any>;
}

interface Event {
  action: string;
  event_category?: string;
  value?: Record<string, any>;
}

export type TrackEvent = (event: Event) => void;
export type TrackPageView = (pageView: PageView) => void;

export interface Analytics {
  trackEvent: TrackEvent;
  trackPageView: TrackPageView;
}

const useAnalytics = (): Analytics => {
  const trackEvent = useCallback(({ action, event_category, value }: Event) => {
    (window as any).gtag('event', action, {
      event_category,
      ...value,
    });
  }, []);

  const trackPageView = useCallback(({ page_title, page_path, context, value }: PageView) => {
    window.dataLayer?.push({
      event: 'page_view',
      page_title,
      page_path,
      context,
      ...value,
    });
  }, []);

  return {
    trackEvent,
    trackPageView,
  };
};

export default useAnalytics;
