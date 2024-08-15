import { z } from 'zod';
import { createOauth2Session, signIn } from '@/lib/actions/auth.actions';
import { BaseFormStep, FormStep, OnboardingProps, RegistrationFormType, SignInProps, SignUpParams } from '../types/auth';

const LoginForm: BaseFormStep = {
  key: 'login-form',
  title: 'Login',
  description: ['Welcome back to your favorite example'],
  body: [],
  actionButtons: [
    {
      key: 'button-apple',
      text: 'Login with Apple',
      variant: 'outline',
      icon: 'apple',
      iconPosition: 'left',
      type: 'button',
      disabled: true,
      comingSoon: true,
      onClickFunction: () => window.alert('LOGIN WITH APPLE'),
    },
    {
      key: 'button-google',
      text: 'Login with Google',
      variant: 'outline',
      icon: 'google',
      iconPosition: 'left',
      type: 'button',
      onClickFunction: () =>
        createOauth2Session().then(response => {
          if (response.success) window.location.href = response.redirectUrl!;
        }),
    },
    {
      key: 'button-email',
      text: 'Login with Email',
      variant: 'default',
      icon: 'email',
      iconPosition: 'left',
      type: 'button',
      onClickFunction: (forward: void) => forward,
    },
  ],
};

const logInAccountFormSchema = z.object({
  email: z.string().email().min(3).max(150),
  password: z.string().min(8).max(100),
});

const LogInAccountForm: FormStep<SignInProps> = {
  stepValidationSchema: logInAccountFormSchema,
  key: 'email-password-form',
  title: 'Login with email',
  body: [
    [
      {
        key: 'email',
        label: 'Email',
        inputOptions: {
          type: 'email',
          placeHolder: 'email@example.com',
        },
      },
    ],
    [
      {
        key: 'password',
        label: 'Password',
        inputOptions: {
          type: 'password',
          defaultValue: '',
        },
      },
    ],
  ],
  actionButtons: [
    {
      key: 'button-back',
      text: 'Go Back',
      variant: 'link',
      type: 'button',
      className: 'w-1/2 w-full',
      onClickFunction: (back: void) => back,
    },
    {
      key: 'button-login-account',
      text: 'Login',
      variant: 'default',
      type: 'submit',
      className: 'w-1/2 w-full',
    },
  ],
  onSubmit: data => signIn(data),
};

export const LoginForms: RegistrationFormType<FormStep<OnboardingProps> | FormStep<SignUpParams>> = [LoginForm, LogInAccountForm];
