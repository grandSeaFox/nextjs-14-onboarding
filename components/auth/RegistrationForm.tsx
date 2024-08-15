'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/lib/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { HOME_ROUTE } from '@/lib/constants';
import { RegistrationForms } from '@/lib/models/Register';
import AuthFormController from './AuthFormController';
import { useToast } from '@/components/ui/use-toast';

const RegistrationForm = () => {
  const router = useRouter();
  const { isLoading, user, setUser, logout, error, me } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<number>(0);
  const totalSteps = RegistrationForms.length;

  useEffect(() => {
    const currentIndex = RegistrationForms.findIndex(form => form.key === user?.lastCompletedStep);
    if (currentIndex !== -1 && currentIndex + 1 < RegistrationForms.length) {
      return setStep(currentIndex + 1);
    } else if (user?.$id) {
      return setStep(2);
    }

    return setStep(0);
  }, [user?.$id, user?.lastCompletedStep]);

  const formStep = useMemo(() => RegistrationForms[step], [step]);

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
          if (RegistrationForms[step - 1]) return setStep(prevStep => prevStep - 1);
        }}
        goForward={() => {
          if (RegistrationForms[step + 1]) return setStep(prevStep => prevStep + 1);
          else if (!RegistrationForms[step + 1]) return router.push(HOME_ROUTE);
        }}
        logout={logout}
        me={me}
        setUser={setUser}
        isLoading={isLoading}
        user={user}
        totalSteps={totalSteps}
      />
    </div>
  );
};

export default RegistrationForm;
