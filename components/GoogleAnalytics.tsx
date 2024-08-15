'use client';

import React from 'react';
import Script from 'next/script';
import { useAuth } from '@/lib/providers/AuthProvider';

const GoogleAnalytics = () => {
  const { user } = useAuth();
  const userId = user?.userId;

  return (
    <>
      <Script
        id="google-analytics-script"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
        async
      />
      <Script id="google-analytics-setup" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', { 'user_id': '${userId}' });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
