'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import '../lib/styles/skeleton-styles.css';
import { useAuth } from '@/lib/providers/AuthProvider';
interface FooterProps {
  type?: 'desktop' | 'mobile';
}

const FooterSkeleton = ({ type = 'desktop' }: { type?: string }) => {
  return (
    <div className={`skeleton ${type === 'mobile' ? 'skeletonMobile' : 'skeletonDesktop'}`}>
      <div className="skeletonContent">
        <div className="skeletonLine"></div>
      </div>
      <div className="skeletonAvatar"></div>
    </div>
  );
};

const Footer = ({ type = 'desktop' }: FooterProps) => {
  const { user, logout } = useAuth();

  if (!user) {
    return <FooterSkeleton type={type} />;
  }

  return (
    <footer className="flex items-center w-full footer">
      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
        <h1 className="text-14 truncate font-semibold text-gray-600">{user?.name}</h1>
        <p className="text-14 truncate font-normal text-gray-600">{user?.email}</p>
      </div>
      <Button variant="link" className="ml-auto pl-4" onClick={() => logout()} id="button-logout-1">
        <Image src="/icons/logout.svg" fill alt="logout" className="hover:bg-gray-50 rounded" />
      </Button>
    </footer>
  );
};

const FooterWrapper = (props: FooterProps) => {
  return (
    <Suspense fallback={<FooterSkeleton type={props.type} />}>
      <Footer {...props} />
    </Suspense>
  );
};

export default FooterWrapper;
