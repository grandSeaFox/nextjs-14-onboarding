'use client';

import Image from 'next/image';
import React from 'react';
import '../../lib/styles/auth-styles.css';
import AuthLoading from '@/components/auth/AuthLoading';
import { useAuth } from '@/lib/providers/AuthProvider';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isLoading } = useAuth();

  return (
    <main className="auth-container">
      {(isLoading && <AuthLoading />) || children}
      <div className="auth-asset">
        <Image src="/next.svg" alt="auth-image" width={600} height={600} priority />
        <h1 className="text-16">Placeholder for image/video/animation</h1>
      </div>
    </main>
  );
}
