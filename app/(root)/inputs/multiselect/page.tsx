'use client';
import React, { useState } from 'react';
import { formatJson } from '@/lib/utils';
import MultiSelectButtonField from '@/components/inputs/MultiSelectButtonField';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { InputMultiSelectLayout, InputMultiSelectType } from '@/lib/types/auth';
import { Label } from '@/components/ui/label';

const MultiSelectPage = () => {
  const [values, setValues] = useState<any>(null);
  const [layout, setLayout] = useState<InputMultiSelectLayout>('column');
  const [mode, setMode] = useState<InputMultiSelectType>('multi');
  const [options, setOptions] = useState<Array<{ label: string; value: string }>>([
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]);
  const [newOption, setNewOption] = useState<{ label: string; value: string }>({ label: '', value: '' });

  const form = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const handleAddOption = () => {
    if (newOption.label && newOption.value) {
      setOptions([...options, newOption]);
      setNewOption({ label: '', value: '' });
    }
  };

  return (
    <div className="w-full h-full md:flex-row sm:flex-col md:flex items-start md:gap-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(data => setValues(data))} className="md:h-full items-start md:w-1/2">
          <h1 className="text-24 mb-2">Inputs:</h1>
          <div className="flex gap-4 mt-2">
            <div className="flex flex-col w-full">
              <Label className="mb-2">Layout - Default: Column</Label>
              <Select onValueChange={e => setLayout(e as InputMultiSelectLayout)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="column">Column</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-full">
              <Label className="mb-2">Mode - Default: Multi</Label>
              <Select onValueChange={e => setMode(e as InputMultiSelectType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="multi">Multi</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-10 mt-2">
            <FormLabel>New option</FormLabel>
            <div className="flex gap-4 my-2">
              <FormControl>
                <Input placeholder="Label" onChange={e => setNewOption({ ...newOption, label: e.target.value })} />
              </FormControl>
              <FormControl>
                <Input placeholder="Value" onChange={e => setNewOption({ ...newOption, value: e.target.value })} />
              </FormControl>
            </div>

            <Button onClick={handleAddOption} type="button">
              Add Option
            </Button>
          </div>

          <MultiSelectButtonField
            control={form.control}
            fieldName="multiSelect"
            items={options}
            defaultValues={['1']}
            layout={layout}
            mode={mode}
            label="Choose Options"
          />
          {mode === 'multi' && (
            <Button type="submit" className="mt-3">
              Test Values
            </Button>
          )}
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

export default MultiSelectPage;
