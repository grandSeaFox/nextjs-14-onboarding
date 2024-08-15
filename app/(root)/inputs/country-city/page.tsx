'use client';

import React, { useEffect, useState } from 'react';
import RegistrationInput from '@/components/auth/RegistrationInput';
import { useForm, useWatch } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatJson } from '@/lib/utils';

const CountryCityInputPage = z.object({
  country: z
    .object({
      name: z.string().optional(),
      isoCode: z.string().optional(),
      currency: z.string().optional(),
      latitude: z.string().optional(),
      longitude: z.string().optional(),
      phonecode: z.string().optional(),
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

const CountryCity = () => {
  const [values, setValues] = useState<any>(null);
  const form = useForm({
    resolver: zodResolver(CountryCityInputPage),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const country = useWatch({ control: form.control, name: 'country' });
  const city = useWatch({ control: form.control, name: 'city' });

  useEffect(() => {
    if (country) form.resetField('city');
  }, [country, form]);

  useEffect(() => {
    if (country || city) setValues({ country, city });
  }, [country, city, form]);

  return (
    <div className="w-full h-full md:flex-row sm:flex-col md:flex items-start md:gap-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => setValues(form.getValues()))} className="md:h-full items-start md:w-1/2">
          <h1 className="text-24">Inputs:</h1>
          <div className="flex-col gap-10 mt-4">
            <RegistrationInput control={form.control} fieldName={'country'} label={'Country'} inputType="country" />
            <RegistrationInput
              control={form.control}
              fieldName={'city'}
              label={'City'}
              inputType="city"
              depends={form.watch('country')}
              disabled={!form.getValues('country')}
            />
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

export default CountryCity;
