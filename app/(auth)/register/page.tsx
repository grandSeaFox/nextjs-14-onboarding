import React, { Suspense } from 'react';
import { SIGN_UP } from '@/lib/constants';
import RegistrationForm from '@/components/auth/RegistrationForm';
import AuthFooter from '@/components/auth/AuthFooter';
import AuthLoading from '@/components/auth/AuthLoading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - NextJs-14-Onboarding',
  description: 'Sign up to create your account',
};

const SignUp = () => {
  return (
    <Suspense fallback={<AuthLoading />}>
      <section className="size-full max-sm:px-6 ">
        <div className="flex-center flex-col min-h-screen">
          <RegistrationForm />
          <AuthFooter type={SIGN_UP} />
        </div>
      </section>
    </Suspense>
  );
};

export default SignUp;
