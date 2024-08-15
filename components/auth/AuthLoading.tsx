'use client';

import { Loader2 } from 'lucide-react';

const AuthLoading = () => {
  return (
    <section className="flex-center size-full max-sm:px-6 gap-3 items-center justify-center h-[300px] p-3">
      <Loader2 className="animate-spin" size={40} />
      Loading...
    </section>
  );
};

export default AuthLoading;
