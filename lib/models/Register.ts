import { z } from 'zod';
import { createAccount, createOauth2Session, upsertUser } from '@/lib/actions/auth.actions';
import { BaseFormStep, FormStep, OnboardingProps, RegistrationFormType, SignUpParams } from '../types/auth';

const LandingForm: BaseFormStep = {
  key: 'registration-form',
  title: 'Registration',
  description: ['Start your user journey here with this awesome example'],
  body: [],
  actionButtons: [
    {
      key: 'button-apple',
      text: 'Continue with Apple',
      variant: 'outline',
      icon: 'apple',
      iconPosition: 'left',
      type: 'button',
      disabled: true,
      comingSoon: true,
      onClickFunction: () => window.alert('REGISTER WITH APPLE'),
    },
    {
      key: 'button-google',
      text: 'Continue with Google',
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
      text: 'Continue with Email',
      variant: 'default',
      icon: 'email',
      iconPosition: 'left',
      type: 'button',
      onClickFunction: (forward: void) => forward,
    },
  ],
};

const registrationAccountFormSchema = z.object({
  email: z.string().email().min(3).max(150),
  password: z.string().min(8).max(100),
});

const RegistrationAccountForm: FormStep<SignUpParams> = {
  stepValidationSchema: registrationAccountFormSchema,
  key: 'email-password-form',
  title: 'Register with email',
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
      key: 'button-create-account',
      text: 'Create Account',
      variant: 'default',
      type: 'submit',
      className: 'w-1/2 w-full',
    },
  ],
  onSubmit: data => createAccount(data),
};

const registrationKYCFormSchema = z.object({
  name: z.string().min(2).max(150),
  dateOfBirth: z.date({
    required_error: 'A date of birth is required.',
  }),
  country: z
    .object({
      name: z.string().optional(),
      isoCode: z.string().optional(),
      currency: z.string().optional(),
      latitude: z.string().optional(),
      longitude: z.string().optional(),
      phonecode: z.string().optional(),
      flag: z.string().optional(),
    })
    .optional(),
  city: z
    .object({
      name: z.string().optional(),
      countryCode: z.string().optional(),
      latitude: z.string().optional(),
      stateCode: z.string().optional(),
      longitude: z.string().optional(),
    })
    .optional(),
});

const RegistrationUserForm: FormStep<OnboardingProps> = {
  key: 'user-info-form',
  stepValidationSchema: registrationKYCFormSchema,
  title: 'Tell us about yourself',
  description: ['We want to make sure you get the most out of this example'],
  body: [
    [
      {
        key: 'name',
        label: 'Full name',
        inputOptions: {
          type: 'text',
          placeHolder: 'John Doe',
          validations: {
            required: {
              value: true,
            },
          },
        },
      },
    ],
    [
      {
        key: 'dateOfBirth',
        label: 'Date of Birth',
        inputOptions: {
          type: 'date',
          className: 'form-item--required',
          visible: 'name',
        },
      },
    ],
    [
      {
        key: 'country',
        label: 'Country',
        inputOptions: {
          type: 'country',
          placeHolder: 'Germany',
          visible: 'dateOfBirth',
        },
      },
      {
        key: 'city',
        label: 'City',
        inputOptions: {
          type: 'city',
          placeHolder: 'Berlin',
          visible: 'dateOfBirth',
          depends: 'country',
        },
      },
    ],
  ],
  actionButtons: [
    {
      key: 'button-save-user-info',
      text: 'Continue',
      variant: 'default',
      type: 'submit',
    },
  ],
  onSubmit: (data: OnboardingProps, formStepKey?: string) => upsertUser(data, formStepKey!),
};

const multiSelectLayoutSchema = z.object({
  'multi-select-input': z.array(z.string()).min(3, { message: 'At least one option must be selected.' }),
});

const multiSelectLayout: FormStep<OnboardingProps> = {
  key: 'test-layout-1',
  stepValidationSchema: multiSelectLayoutSchema,
  title: 'We could ask a question here we want the user to answer',
  description: ['And specify something, please choose at least 3 '],
  body: [
    [
      {
        key: 'multi-select-input',
        label: 'Full name',
        inputOptions: {
          type: 'multi-select',
          validations: {
            required: {
              value: true,
            },
          },
          items: [
            { label: 'This is value 1', value: '1' },
            { label: 'This is value 2', value: '2' },
            { label: 'This is value 3', value: '3' },
            { label: 'This is value 4', value: '4' },
            { label: 'This is value 5', value: '5' },
            { label: 'This is value 6', value: '6' },
          ],
        },
      },
    ],
  ],
  actionButtons: [
    {
      key: 'button-save-user-info',
      text: 'Continue',
      variant: 'outline',
      type: 'submit',
      className: 'w-1/2 w-full',
    },
  ],
  onSubmit: (data: OnboardingProps, formStepKey?: string) => upsertUser(data, formStepKey!),
};

const singleSelectLayout: FormStep<OnboardingProps> = {
  key: 'test-layout-2',
  title: 'This is a single select',
  description: [''],
  body: [
    [
      {
        key: 'single-select-input',
        label: 'Full name',
        inputOptions: {
          type: 'single-select',
          validations: {
            required: {
              value: true,
            },
          },
          items: [
            { label: 'This is value 1', value: '1' },
            { label: 'This is value 2', value: '2' },
            { label: 'This is value 3', value: '3' },
            { label: 'This is value 4', value: '4' },
            { label: 'This is value 5', value: '5' },
            { label: 'This is value 6', value: '6' },
          ],
        },
      },
    ],
  ],
  actionButtons: [],
  onSubmit: (data: OnboardingProps, formStepKey?: string) => upsertUser(data, formStepKey!),
};

const TestSkippableForm: FormStep<OnboardingProps> = {
  key: 'a-very-skippable-form',
  title: 'You can skip this form =)',
  description: [''],
  body: [],
  actionButtons: [
    {
      key: 'skip',
      text: 'Skip',
      variant: 'secondary',
      type: 'submit',
    },
  ],
  onSubmit: (data: OnboardingProps, formStepKey?: string) => upsertUser(data, formStepKey!),
};

const TestSkippableForm2: FormStep<OnboardingProps> = {
  key: 'a-very-skippable-form-1',
  title: 'You can skip this form =)',
  description: [''],
  body: [],
  actionButtons: [
    {
      key: 'button-1',
      text: 'Test 1',
      variant: 'secondary',
      type: 'button',
      onClickFunction: () => alert('Test 1 clicked'),
    },
    {
      key: 'button-2',
      text: 'Test 2',
      variant: 'destructive',
      type: 'button',
      onClickFunction: () => alert('Test 2 clicked'),
    },
    {
      key: 'button-3',
      text: 'Test 3',
      variant: 'outline',
      type: 'button',
      onClickFunction: () => alert('Test 3 clicked'),
    },
    {
      key: 'button-4',
      text: 'Skip',
      variant: 'default',
      type: 'submit',
    },
  ],
  onSubmit: (data: OnboardingProps, formStepKey?: string) => upsertUser(data, formStepKey!),
};

export const RegistrationForms: RegistrationFormType<FormStep<OnboardingProps> | FormStep<SignUpParams>> = [
  LandingForm,
  RegistrationAccountForm,
  RegistrationUserForm,
  multiSelectLayout,
  singleSelectLayout,
  TestSkippableForm,
  TestSkippableForm2,
];
