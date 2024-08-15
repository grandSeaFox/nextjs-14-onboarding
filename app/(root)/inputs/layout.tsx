'use client';

import React from 'react';
import { sidebarLinks } from '@/lib/constants';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { findBreadcrumbs } from '@/lib/utils';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const breadcrumbs = findBreadcrumbs(sidebarLinks, pathname);

  return (
    <div className="w-full h-full items-center px-2">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.route} className="flex gap-2 items-center">
              <BreadcrumbItem>
                <Link href={breadcrumb.route} className="font-semibold text-gray-600 text-16">
                  {breadcrumb.label}
                </Link>
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator className="font-semibold text-gray-600">
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="py-10">{children}</div>
    </div>
  );
}
