'use client';
import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import '../../lib/styles/MultiSelectButtonField-styles.css';
import { Control, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { InputMultiSelectLayout, InputMultiSelectType } from '@/lib/types/auth';

interface MultiSelectButtonFieldProps {
  control: Control<FieldValues, any>;
  items?: Array<{ label: string; value: string }>;
  defaultValues?: string[];
  disabled?: boolean;
  layout?: InputMultiSelectLayout;
  label?: string;
  helperText?: string;
  fieldName: string;
  mode?: InputMultiSelectType;
  min?: number;
  max?: number;
  onChange?: (selectedValues: string[]) => void;
}

const MultiSelectButtonField: React.FC<MultiSelectButtonFieldProps> = ({
  control,
  items,
  defaultValues = [],
  disabled,
  layout = 'column',
  label,
  fieldName,
  mode = 'single',
  min,
  max,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues);

  useEffect(() => {
    if (onChange) {
      onChange(selectedValues);
    }
  }, [selectedValues, onChange]);

  const handleButtonClick = (value: string, fieldOnChange: (value: any) => void) => {
    let newSelectedValues: string[];
    if (mode === 'single') {
      newSelectedValues = [value];
    } else {
      if (selectedValues.includes(value)) {
        newSelectedValues = selectedValues.filter(v => v !== value);
      } else {
        newSelectedValues = [...selectedValues, value];
      }
    }
    // Check for min and max constraints
    if ((min && newSelectedValues.length < min) || (max && newSelectedValues.length > max)) {
      return;
    }
    setSelectedValues(newSelectedValues);
    fieldOnChange(newSelectedValues);
  };

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
          <div className={cn(layout === 'grid' ? 'grid-layout' : 'column-layout', 'w-full')}>
            {items &&
              items.map(option => (
                <Button
                  disabled={mode === 'single' && disabled}
                  key={option.value}
                  onClick={() => handleButtonClick(option.value, field.onChange)}
                  variant={selectedValues.includes(option.value) ? 'default' : 'secondary'}
                  className="w-full"
                  type={mode === 'single' ? 'submit' : 'button'}
                >
                  {option.label}
                </Button>
              ))}
          </div>
          <FormMessage className="form-message mt-2" />
        </FormItem>
      )}
    ></FormField>
  );
};

export default MultiSelectButtonField;
