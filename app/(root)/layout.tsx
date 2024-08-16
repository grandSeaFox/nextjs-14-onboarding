import React from 'react';
import { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import MobileNavbar from '@/components/MobileNavbar';
import DriverTour from '@/components/DriverTour';

export const metadata: Metadata = {
  title: 'Home - NextJs-14-Onboarding',
  description: 'The end of the example',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex w-full h-full font-inter">
      <Sidebar />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <MobileNavbar />
        </div>
        <div className="flex w-full h-full flex-col items-center justify-center p-6">{children}</div>
      </div>
      <DriverTour />
    </main>
  );
}
