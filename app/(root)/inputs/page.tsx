import React from 'react';
import Link from 'next/link';
import { CALENDAR_PICKER_ROUTE, COUNTRY_CITY_ROUTE, MULTISELECT_ROUTE } from '@/lib/constants';

const Inputs = () => {
  return (
    <div className="w-full h-full flex gap-5 sm:flex-row xs:flex-col">
      <Link
        href={COUNTRY_CITY_ROUTE}
        className="flex drop-shadow-lg sm:w-60 xs:w-full h-32 bg-blue-500 rounded-3xl items-center justify-center p-3 font-semibold text-white hover:bg-amber-400"
      >
        Country City Input
      </Link>
      <Link
        href={MULTISELECT_ROUTE}
        className="flex drop-shadow-lg sm:w-60 xs:w-full h-32 bg-teal-500 rounded-3xl items-center justify-center p-3 font-semibold text-white hover:bg-amber-400"
      >
        Multi Select
      </Link>
      <Link
        href={CALENDAR_PICKER_ROUTE}
        className="flex drop-shadow-lg sm:w-60 xs:w-full h-32 bg-emerald-500 rounded-3xl items-center justify-center p-3 font-semibold text-white hover:bg-amber-400"
      >
        Calendar Picker
      </Link>
    </div>
  );
};

export default Inputs;
