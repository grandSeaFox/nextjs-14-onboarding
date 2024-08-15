// components/FullPageLoader.tsx
import React from 'react';
import Image from 'next/image';

const FullPageLoader = () => {
  return (
    <body className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Image src="/icons/loader.svg" alt="loader" width={50} height={50} />
    </body>
  );
};

export default FullPageLoader;
