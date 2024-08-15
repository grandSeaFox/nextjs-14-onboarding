'use client';

import React from 'react';
import { useFlags } from 'flagsmith/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const FeatureFlag = () => {
  const { 'test-1': test1, 'test-2': test2 } = useFlags(['test-1', 'test-2']);
  return (
    <div className="w-full h-full flex flex-col items-start">
      <h1 className="font-medium text-30 flex-row w-full">
        Feature flags from
        <Button variant="link" className="inline text-appGradient text-[30px] px-1">
          <Link href="https://www.flagsmith.com/" target="_blank" rel="noopener noreferrer">
            Flagsmith
          </Link>
        </Button>
      </h1>

      <h2 className="font-light text-20 mt-10">
        Feature flag: <span className="font-bold">test-1</span> value: <span className="font-bold">{test1.value} 🥔</span>
      </h2>
      <h2 className="font-light text-20">
        Enabled:
        <span className="font-bold"> {test1.enabled.toString()}</span>
      </h2>
      <h2 className="font-light text-20 mt-10">
        Feature flag: <span className="font-bold">test-2</span> value: <span className="font-bold">{test2.value} 🐟</span>
      </h2>
      <h2 className="font-light text-20">
        Enabled:
        <span className="font-bold"> {test2.enabled.toString()}</span>
      </h2>
    </div>
  );
};

export default FeatureFlag;
