import React from 'react';
import { cn } from '@/lib/utils';
import { Control, FieldValues } from 'react-hook-form';
import { InputType } from '@/lib/types/auth';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { CalendarPicker } from '../inputs/CalendarPicker';
import CountryStateCityInput from '../inputs/CountryStateCity';
import MultiSelectButtonField from '@/components/inputs/MultiSelectButtonField';

type RegistrationInputProps = {
  control: Control<FieldValues, any>;
  fieldName: string;
  label: any;
  placeHolder?: string;
  inputType?: InputType;
  className?: string;
  depends?: any;
  disabled?: boolean;
  layout?: 'grid' | 'column';
  items?: Array<{ label: string; value: string }>;
  defaultValue?: Array<string>;
};

const RegistrationInput = ({
  control,
  fieldName,
  label,
  placeHolder = '',
  inputType = 'text',
  className,
  depends,
  disabled,
  layout,
  items,
  defaultValue,
}: RegistrationInputProps) => {
  if (inputType === 'country' || inputType === 'city')
    return (
      <CountryStateCityInput control={control} fieldName={fieldName} type={inputType} label={label} disabled={disabled} depends={depends} />
    );

  if (inputType === 'date') return <CalendarPicker control={control} fieldName={fieldName} className={className} label={label} />;

  if (inputType === 'single-select')
    return (
      <MultiSelectButtonField
        control={control}
        items={items}
        fieldName={fieldName}
        layout={layout}
        defaultValues={defaultValue}
        disabled={disabled}
      />
    );

  if (inputType === 'multi-select')
    return (
      <MultiSelectButtonField
        control={control}
        items={items}
        fieldName={fieldName}
        layout={layout}
        defaultValues={defaultValue}
        disabled={disabled}
        mode={'multi'}
      />
    );

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn('form-item', className)}>
          <FormLabel htmlFor={fieldName}>{label}</FormLabel>
          <Input {...field} placeholder={placeHolder} type={inputType} onChange={field.onChange} onBlur={field.onBlur} ref={field.ref} />
          <FormMessage className="form-message mt-2" />
        </FormItem>
      )}
    />
  );
};

export default RegistrationInput;
