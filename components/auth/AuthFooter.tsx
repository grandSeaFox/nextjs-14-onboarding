'use client';

import React from 'react';
import Link from 'next/link';
import { SIGN_IN, REGISTRATION_ROUTE, LOGIN_ROUTE } from '@/lib/constants';
import { Login, Register } from '@/lib/types/auth';
import { useAuth } from '@/lib/providers/AuthProvider';

const AuthFooter = ({ type }: { type: Login | Register }) => {
  const { user } = useAuth();

  if (user) return;

  return (
    <footer className="flex justify-center gap-1">
      <p className="text-14 font-normal text-gray-600">{type === SIGN_IN ? "Don't have an account?" : 'Already have an account?'}</p>
      <Link href={type === SIGN_IN ? REGISTRATION_ROUTE : LOGIN_ROUTE} className="form-link">
        {type === SIGN_IN ? 'Sign up' : 'Sign in'}
      </Link>
    </footer>
  );
};

export default AuthFooter;
