'use client';

import React, { useEffect, useMemo, useState } from 'react';
import AuthFormController from './AuthFormController';
import { LoginForms } from '@/lib/models/Login';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/providers/AuthProvider';

const LoginForm = () => {
  const { isLoading, user, me, logout, error } = useAuth();
  const [step, setStep] = useState<number>(0);
  const { toast } = useToast();
  const totalSteps = LoginForms.length;

  const formStep = useMemo(() => LoginForms[step], [step]);

  useEffect(() => {
    if (error !== null && error !== 'No session')
      toast({ variant: 'destructive', title: 'Oops there seems to have been a problem', description: error });
  }, [error, toast]);

  return (
    <div className="flex-center size-full max-sm:px-6">
      <AuthFormController
        formStep={formStep}
        step={step}
        goBack={() => {
          if (LoginForms[step - 1]) return setStep(prevStep => prevStep - 1);
        }}
        goForward={() => {
          if (LoginForms[step + 1]) return setStep(prevStep => prevStep + 1);
        }}
        logout={logout}
        me={me}
        isLoading={isLoading}
        user={user}
        totalSteps={totalSteps}
      />
    </div>
  );
};

export default LoginForm;
