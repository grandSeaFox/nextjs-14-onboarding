'use client';

import { Button } from '@/components/ui/button';
import React, { Suspense, useEffect } from 'react';
import useAnalytics from '@/lib/hooks/useAnalytics';
import { usePathname } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { formatJson } from '@/lib/utils';
import Image from 'next/image';
import { useAuth } from '@/lib/providers/AuthProvider';

const Home = () => {
  const { isLoading, user, logout } = useAuth();
  const { trackEvent } = useAnalytics();

  if (isLoading || !user) return <Loader />;

  const handleClick = () => {
    const buttonClickEvent = {
      action: 'button_analytics_home_page',
      event_category: 'button_clicks',
    };
    toast({
      duration: 7000,
      title: 'You just sent an analytics event to GAnalytics with:',
      description: (
        <div className="bg-gray-900 text-white p-4 rounded-lg">
          <pre className="whitespace-pre-wrap overflow-x-auto text-sm">
            <code dangerouslySetInnerHTML={{ __html: formatJson(buttonClickEvent) }} />
          </pre>
        </div>
      ),
    });
    trackEvent(buttonClickEvent);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-24 flex mb-10">
        <p>
          Greetings <b>{user?.name}</b>, there have now been a total of <b>{user?.totalUsers}</b> users to register on this webpage.
        </p>
      </h1>
      <h1 className="text-24 flex mb-10 text-gray-600">Check out the inputs to know what type of input you can use on your onboarding</h1>
      <div className="flex gap-4">
        <Button onClick={handleClick} className="w-[150px]" id="button-analytics">
          Test Analytics
        </Button>
        <Button onClick={() => logout()} className="w-[150px]" iconRight={<Image src="/icons/logout.svg" fill alt="logout" />} id="button-logout">
          Logout
        </Button>
      </div>
    </div>
  );
};

const Loader = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="block w-96 h-6 bg-gray-200 rounded animate-pulse mb-2"></span>
      <span className="block w-96 h-6 bg-gray-200 rounded animate-pulse mb-10"></span>
      <span className="block w-24 h-10 bg-gray-200 rounded animate-pulse"></span>
    </div>
  );
};

const HomeWrapper = (props: any) => {
  return (
    <Suspense fallback={<Loader />}>
      <Home {...props} />
    </Suspense>
  );
};

export default HomeWrapper;
