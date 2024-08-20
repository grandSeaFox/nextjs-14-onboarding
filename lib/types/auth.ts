import { z } from 'zod';
import { ButtonVariant } from './button';
import { ApiResponse } from '@/lib/types/index';

export type Login = 'login';
export type Register = 'register';

export type SignUpParams = {
  email: string;
  password: string;
};

export type OnboardingProps = {
  userId: string;
  name?: string;
  oldFormAnswersData?: Record<string, string>;
  completed?: boolean;
  lastCompletedStep?: string;
  formAnswersByStepKey?: string;
};

export type SignInProps = {
  email: string;
  password: string;
};

export type InputMultiSelectType = 'multi' | 'single';
export type InputMultiSelectLayout = 'column' | 'grid';

export type InputType =
  | 'email'
  | 'password'
  | 'text'
  | 'number'
  | 'dropdown'
  | 'phone'
  | 'date'
  | 'checkbox'
  | 'country'
  | 'city'
  | 'single-select'
  | 'multi-select';

const inputTypeSchema = z.enum([
  'email',
  'password',
  'text',
  'number',
  'dropdown',
  'phone',
  'date',
  'country',
  'city',
  'single-select',
  'multi-select',
]);

export const formItemsSchema = z.object({
  key: z.string(),
  label: z.any(),
  description: z.string().optional(),
  style: z.any(),
  urlParameters: z.string().optional(),
  inputOptions: z.object({
    defaultValue: z.any(),
    type: inputTypeSchema,
    visible: z.string().optional(),
    depends: z.string().optional(),
    placeHolder: z.string().optional(),
    items: z.array(z.any()).optional(),
    validations: z.any(),
    className: z.string().optional(),
  }),
});

export type FormItemInterface = z.infer<typeof formItemsSchema>;

type ButtonIconPosition = 'left' | 'right';
type ButtonType = 'submit' | 'reset' | 'button' | 'skip' | undefined;

export interface BaseButtonProps {
  key: string;
  variant?: ButtonVariant;
  type?: ButtonType;
  icon?: string;
  iconPosition?: ButtonIconPosition;
  text: any;
  extraText?: any;
  className?: string;
  disabled?: boolean;
  comingSoon?: boolean;
}

export interface ButtonProps extends BaseButtonProps {
  type: 'button';
  onClickFunction: () => void;
}
export interface OtherButtonProps extends BaseButtonProps {
  type?: 'submit' | 'reset' | undefined;
  onClickFunction?: never;
}

export type ButtonInterface = ButtonProps | OtherButtonProps;

export type FormItemRow = Array<FormItemInterface>;

export interface BaseRegistrationStepSchema {
  key: string;
  title: any;
  description?: Array<string>;
  body: Array<FormItemRow>;
  actionButtons: Array<ButtonInterface>;
  stepValidationSchema?: z.ZodSchema<any>;
}

export interface StepRegistrationStepSchema<T> extends BaseRegistrationStepSchema {
  onSubmit?: (data: T, formStepKey?: string) => Promise<ApiResponse>;
}

export type BaseFormStep = BaseRegistrationStepSchema;
export type FormStep<T> = StepRegistrationStepSchema<T>;

export type RegistrationFormType<T> = Array<BaseFormStep> | Array<FormStep<T>>;
