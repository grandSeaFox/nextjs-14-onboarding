import React, { Suspense } from 'react';
import { SIGN_IN } from '@/lib/constants';
import AuthFooter from '@/components/auth/AuthFooter';
import LoginForm from '@/components/auth/LoginForm';
import AuthLoading from '@/components/auth/AuthLoading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - NextJs-14-Onboarding',
  description: 'Sign in to access your account',
};
const SignIn = () => {
  return (
    <Suspense fallback={<AuthLoading />}>
      <section className="size-full max-sm:px-6 ">
        <div className="flex-center flex-col min-h-screen">
          <LoginForm />
          <AuthFooter type={SIGN_IN} />
        </div>
      </section>
    </Suspense>
  );
};

export default SignIn;
