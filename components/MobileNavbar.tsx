'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { HOME_ROUTE, sidebarLinks } from '@/lib/constants';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet';
import Footer from '@/components/Footer';

const MobileNavbar = () => {
  const pathName = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image src="/icons/hamburger.svg" width={30} height={30} alt="menu icon" className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white max-w-[300px]">
          <Link
            href={HOME_ROUTE}
            className="cursor-pointer gap-3 flex px-4 xs:flex-col md:flex-row items-center justify-center xs:items-start"
          >
            <Image src="/logo-black.png" alt="nextjs-14-onboarding-logo" priority={false} width={100} height={60} />
            <h1 className="text-20 font-bold text-black-1">NextJs-14 Onboarding</h1>
          </Link>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex flex-col gap-6 md:pt-16 xs:pt-5 text-white">
                {sidebarLinks.map(link => {
                  const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn('mobilenav-sheet_close', {
                          'bg-appGradient': isActive,
                        })}
                      >
                        <Image
                          src={link.imgURL!}
                          alt={link.label}
                          width={20}
                          height={20}
                          className={cn({
                            'brightness-[3] invert-0': isActive,
                          })}
                        />
                        <p
                          className={cn('text-16 font-semibold text-black-2', {
                            '!text-white': isActive,
                          })}
                        >
                          {link.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
            <Footer type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;
