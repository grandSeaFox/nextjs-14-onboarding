import { Inter, IBM_Plex_Serif } from 'next/font/google';
import './globals.css';
import 'driver.js/dist/driver.css';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import FlagsmithService from '@/lib/services/flagsmith';
import FlagsmithClientProvider from '@/lib/providers/FlagsmithClientProvider';
import { AuthProvider } from '@/lib/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const serverState = await FlagsmithService.getState();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        <FlagsmithClientProvider serverState={serverState}>
          <AuthProvider>
            <GoogleAnalytics />
            {children}
            <Toaster />
          </AuthProvider>
        </FlagsmithClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata() {
  return {
    title: 'Next 14 Dynamic Onboarding example',
    description:
      'An example on how you can setup an awesome onboarding experience for your users with analytics, dynamic inputs and validations',
    icons: {
      icon: ['/fox-light.png'],
    },
  };
}
