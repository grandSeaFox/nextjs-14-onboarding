'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/lib/constants';
import React from 'react';
import Footer from '@/components/Footer';

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <section className="sidebar" id="sidebar">
      <nav className="flex flex-col gap-4">
        <header className="mb-12 cursor-pointer items-center gap-2 flex">
          <Image src="/logo-black.png" alt="grandFox-logo" width={120} height={30} className="z-0" priority={false} />
          <h1 className="sidebar-logo">Next 14 Onboarding</h1>
        </header>
        {sidebarLinks.map(link => {
          const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);

          return (
            <Link id={link.id} href={link.route} key={link.label} className={cn('sidebar-link', { 'bg-appGradient': isActive })}>
              <div className="relative size-6">
                <Image src={link.imgURL!} alt={link.label} fill className={cn({ 'brightness-[3] invert-0': isActive })} />
              </div>
              <p className={cn('sidebar-label', { '!text-white': isActive })}>{link.label}</p>
            </Link>
          );
        })}
      </nav>
      <Footer />
    </section>
  );
};

export default Sidebar;
