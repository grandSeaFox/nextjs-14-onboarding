'use client';

import React, { useEffect, useState } from 'react';
import { Form } from '@/components/ui/form';
import { formatJson } from '@/lib/utils';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import RegistrationInput from '@/components/auth/RegistrationInput';

const CalendarPickerPageResolver = z.object({
  date: z.date({
    required_error: 'A date of birth is required.',
  }),
});

const CalendarPickerPage = () => {
  const [values, setValues] = useState<any>(null);
  const form = useForm({
    resolver: zodResolver(CalendarPickerPageResolver),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const date = useWatch({ control: form.control, name: 'date' });

  useEffect(() => {
    if (date) setValues(form.getValues());
  }, [form, date]);

  return (
    <div className="w-full h-full md:flex-row sm:flex-col md:flex items-start md:gap-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(data => setValues(data))} className="md:h-full items-start md:w-1/2">
          <h1 className="text-24">Inputs:</h1>
          <div className="flex-row gap-10 mt-2">
            <RegistrationInput control={form.control} fieldName={'date'} label={'Date'} inputType="date" />
          </div>
        </form>
      </Form>
      <div className="md:h-1/2 md:w-1/2 sm:mt-10 md:mt-0 flex-col items-start">
        <h1 className="text-24">Output:</h1>
        <div className="mt-10 bg-gray-900 text-white p-4 rounded-lg">
          <pre className="whitespace-pre-wrap overflow-x-auto text-sm">
            <code dangerouslySetInnerHTML={{ __html: formatJson(values) }} />
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CalendarPickerPage;
