'use client';

import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useState } from 'react';
import { Calendar } from '../ui/calendar';

export const CalendarPicker = ({
  control,
  fieldName,
  className,
  label = 'Date of birth',
}: {
  control: any;
  fieldName: string;
  className?: string;
  label?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem className={cn('form-item', className)}>
            <FormLabel>{label}</FormLabel>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button variant={'outline'} className={cn('w-full font-normal', !field.value && 'text-muted-foreground')}>
                  {field.value ? `${format(field.value, 'PPP')}` : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={date => {
                    field.onChange(date);
                    setIsOpen(false);
                  }}
                  disabled={date => date > new Date() || date < new Date('1930-01-01')}
                  captionLayout="dropdown"
                  fromYear={1930}
                  toYear={2030}
                />
              </PopoverContent>
            </Popover>
            <FormMessage className="form-message mt-2" />
          </FormItem>
        );
      }}
    />
  );
};
