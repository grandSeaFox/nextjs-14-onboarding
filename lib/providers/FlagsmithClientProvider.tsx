'use client';

import { FlagsmithProvider } from 'flagsmith/react';
import flagsmith from 'flagsmith';
import React, { useEffect } from 'react';

const FlagsmithClientProvider = ({ children, serverState }: { children: React.ReactElement; serverState: any }) => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FLAGSMITH_KEY) {
      flagsmith.init({
        identity: 'test',
        environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_KEY,
      });
    }
  }, []);
  return (
    <FlagsmithProvider serverState={serverState} flagsmith={flagsmith}>
      {children}
    </FlagsmithProvider>
  );
};

export default FlagsmithClientProvider;
