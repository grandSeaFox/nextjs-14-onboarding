'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn, extractTwoLevelValues, toObject, getFormItemClassesArray } from '@/lib/utils';
import { REGISTRATION_ROUTE } from '@/lib/constants';
import {
  FormStep,
  FormItemInterface,
  FormItemRow,
  ButtonInterface,
  OnboardingProps,
  SignUpParams,
  SignInProps,
  BaseFormStep,
} from '@/lib/types/auth';
import { User } from '@/lib/types/user';
import { useForm, UseFormReturn, useWatch } from 'react-hook-form';
import { Progress } from '../ui/progress';
import RegistrationInput from './RegistrationInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import useAnalytics from '@/lib/hooks/useAnalytics';
import { ApiResponse } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';
import useFeatureFlags from '@/lib/hooks/useFeatureFlags';

interface AuthFormBuilderProps {
  formStep: BaseFormStep | FormStep<OnboardingProps> | FormStep<SignUpParams> | FormStep<SignInProps>;
  step: number;
  goBack: () => void;
  goForward: () => void;
  logout: (location: string) => void;
  me: () => void;
  isLoading: boolean;
  user?: User;
  setUser?: (user: User) => void;
  totalSteps: number;
}
const AuthFormBuilder = ({ formStep, step, goBack, goForward, logout, me, isLoading, user, setUser, totalSteps }: AuthFormBuilderProps) => {
  const [loading, setLoading] = useState(isLoading || false);
  const { disabledFlags } = useFeatureFlags();
  const { trackEvent } = useAnalytics();
  const formStepSchema = formStep.stepValidationSchema;
  const form: UseFormReturn<any> = useForm({
    resolver: formStepSchema ? zodResolver(formStepSchema) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {},
  });
  const getMinLength = useCallback((formKey: string) => {
    if (!formStepSchema || typeof formStepSchema !== 'object' || !('shape' in formStepSchema)) {
      return 0;
    }
    // @ts-ignore
    const fieldSchema = formStepSchema.shape[formKey];
    if (!fieldSchema || typeof fieldSchema !== 'object' || !('_def' in fieldSchema)) {
      return 0;
    }
    return fieldSchema._def.minLength?.value ?? 0;
  }, [formStepSchema]);

  const formItemHasValue = useCallback(
    (inputType: string, value: any) => {
      if (inputType === 'multi-select') {
        return Array.isArray(value) ? value.length : 0;
      }
      return Array.isArray(value) ? value.length > 0 : Boolean(value);
    },
    []
  );

  const flatFieldList = useMemo(() => formStep.body.flat(), [formStep.body]);
  const formValues = useWatch({ control: form.control });

  const { numCompletedFields, numTotalFields } = useMemo(() => {
    return flatFieldList.reduce(
      (acc, { key, inputOptions: { type } }) => {
        const value = formValues[key];
        if (type === 'multi-select') {
          const minLength = getMinLength(key);
          acc.numTotalFields += minLength || 1;
          const selectedCount = formItemHasValue(type, value);
          acc.numCompletedFields += Math.min(selectedCount as number, minLength || 1);
        } else {
          acc.numTotalFields += 1;
          acc.numCompletedFields += formItemHasValue(type, value) ? 1 : 0;
        }
        return acc;
      },
      { numCompletedFields: 0, numTotalFields: 0 }
    );
  }, [flatFieldList, formValues, getMinLength, formItemHasValue]);

  const defaultValues: Record<string, any> = useMemo(() => {
    if (isLoading) return {};

    const formAnswers = extractTwoLevelValues(toObject(user?.formAnswersByStepKey));

    const defaults: Record<string, any> = {};

    formStep.body.forEach(formItemRow => {
      formItemRow.forEach((field: FormItemInterface) => {
        let value = { ...user, ...formAnswers }[field.key] ?? field.inputOptions.defaultValue;

        if (field.inputOptions.type === 'date' && typeof value === 'string') {
          value = new Date(value);
        }

        defaults[field.key] = value;
      });
    });

    return defaults;
  }, [formStep.body, isLoading, user]);

  useEffect(() => {
    if (isLoading) return;
    form.reset(defaultValues);
  }, [defaultValues, form, isLoading]);

  useEffect(() => {
    form.clearErrors();
  }, [form, step]);

  const formItemClasses = getFormItemClassesArray(formStep.body, formValues);

  const handleSubmit = useCallback(
    async (data: any) => {
      setLoading(true);
      const completed = step === totalSteps - 1;
      const stepAnswers = { userId: user?.completed === undefined ? user?.$id : user?.userId, completed, ...data };
      if ('onSubmit' in formStep && typeof formStep.onSubmit === 'function') {
        try {
          await formStep.onSubmit(stepAnswers, formStep.key).then((response: ApiResponse) => {
            if (!response.success) {
              toast({
                variant: 'destructive',
                title: 'Oops there was a problem',
                description: response.message,
              });
              return;
            }
            setUser && step > 0 && setUser({ ...user, ...response.data });
            form.reset({});
            return goForward();
          });
          if (completed) me();
        } catch (error) {
          console.error('Submit error:', error);
        } finally {
          setLoading(prevState => !prevState);
        }
      } else {
        console.warn('onSubmit method is not available');
      }
    },
    [step, totalSteps, user, formStep, me, setUser, form, goForward],
  );

  return (
    <>
      <div className="auth-form">
        {step > 1 && (
          <div>
            {step === 2 && (
              <Button variant="link" className="px-0 pr-4" type="button" loading={isLoading} onClick={() => logout(REGISTRATION_ROUTE)}>
                Reset
              </Button>
            )}
            {step > 2 && (
              <Button variant="link" className="px-0 pr-4" type="button" loading={isLoading} onClick={goBack}>
                Back
              </Button>
            )}
            <p className="text-right mb-2 text-12 text-gray-600">
              Step {step} of {totalSteps - 1}
            </p>
            <Progress value={(numCompletedFields / numTotalFields) * 100} className={cn('h-2 w-full', 'bg-blue-100')} />
          </div>
        )}
        <header className="flex flex-col gap-5 md:gap-8 relative">
          <div className="flex flex-col gap-1 md:gap-3 text-center">
            <h1 className="text-24 lg:text-28 font-semibold text-gray-900">{formStep.title}</h1>
            {formStep.description && <span className="text-14 font-normal text-gray-600 mb-3">{formStep.description[0]}</span>}
          </div>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(data => handleSubmit(data))}>
            {formStep.body.length > 0 && (
              <div className="form-items">
                {formStep.body.map((formItemRow: FormItemRow, index: number) => (
                  <div key={`${formItemRow[0].key}-container`} className={formItemClasses[index]}>
                    {formItemRow.map((formItem: FormItemInterface) => !disabledFlags?.includes(formItem.key) && (
                      <RegistrationInput
                        control={form.control}
                        key={formItem.key}
                        fieldName={formItem.key}
                        label={formItem.label}
                        inputType={formItem.inputOptions.type}
                        placeHolder={formItem.inputOptions.placeHolder}
                        className={formItem.inputOptions.className}
                        depends={formItem.inputOptions.depends && form.watch(formItem.inputOptions.depends)}
                        items={formItem.inputOptions.items}
                        defaultValue={defaultValues[formItem.key]}
                        disabled={
                          (!!formItem.inputOptions.depends && !formValues[formItem.inputOptions.depends]) || isLoading || loading
                        }
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
            <div className="auth-button-group" data-action={formStep.actionButtons.length === 2}>
              {formStep.actionButtons.map((button: ButtonInterface) => !disabledFlags?.includes(button.key) && (
                <Button
                  key={button.key}
                  size="lg"
                  variant={button.variant}
                  className={cn({ 'w-full': !button.className }, button.className)}
                  type={button.type}
                  disabled={
                    button.disabled || (!form.formState.isValid && button.type === 'submit') || isLoading || form.formState.isSubmitting
                  }
                  loading={isLoading}
                  onClick={() => {
                    trackEvent({
                      action: 'button',
                      event_category: 'button_click',
                      value: { buttonName: button.key, context: `onboarding_step_${step}`, user_id: user?.userId },
                    });
                    if (!button.onClickFunction) return;
                    if (button.key === 'button-email') goForward();
                    if (button.key === 'button-back') goBack();
                    button.onClickFunction();
                  }}
                  comingSoon={button.comingSoon}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AuthFormBuilder;
