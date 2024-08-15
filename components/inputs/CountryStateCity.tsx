'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Country, City, ICity, ICountry } from 'country-state-city';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';

interface CountryStateCityInputProps {
  control: any;
  fieldName: string;
  type: 'country' | 'city';
  label: string;
  className?: string;
  disabled?: boolean;
  depends?: any;
}

const CountryStateCityInput: React.FC<CountryStateCityInputProps> = ({ control, fieldName, type, label, className, disabled, depends }) => {
  const [options, setOptions] = useState<ICountry[] | ICity[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setOptions([]);
    if (type === 'country') {
      setOptions(Country.getAllCountries());
    } else if (type === 'city' && depends?.isoCode) {
      const cities = City.getCitiesOfCountry(depends?.isoCode) ?? [];
      setOptions(cities);
    }
  }, [depends?.isoCode, type]);

  const filteredOptions = useMemo(() => {
    let seenCoordinates = new Set<string>();
    const filtered = options.filter(option => {
      const isDuplicate = seenCoordinates.has(`${option.latitude},${option.longitude},${option.name}`);
      if (!isDuplicate) {
        seenCoordinates.add(`${option.latitude},${option.longitude},${option.name}`);
        return option.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
    return filtered.slice(0, 15);
  }, [options, searchQuery]);

  const placeholder = useCallback(() => {
    if (type === 'city' && options.length === 0) return { label: `No Cities available`, disable: true };
    return { label: `Select ${type}`, disable: false };
  }, [options.length, type]);

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
                <Button variant="outline" role="combobox" className="justify-between w-full" disabled={disabled || placeholder().disable}>
                  {field.value ? (
                    <span>
                      {field.value && type === 'country' && (
                        <span className="mr-2">{field.value.flag ? field.value.flag : JSON.parse(field.value).flag}</span>
                      )}
                      {field.value.name ? field.value?.name : JSON.parse(field.value).name}
                    </span>
                  ) : (
                    placeholder().label
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput
                    placeholder={`Select ${type}`}
                    value={searchQuery}
                    onValueChange={(e: React.SetStateAction<string>) => setSearchQuery(e)}
                  />
                  <CommandList>
                    <CommandEmpty>{`No ${label} found`}</CommandEmpty>
                    <CommandGroup>
                      {filteredOptions.map((option: ICountry | ICity) => (
                        <CommandItem
                          value={option.name}
                          key={`${option.latitude},${option.longitude},${option.name}`}
                          onSelect={() => {
                            field.onChange(option);
                            setIsOpen(false);
                          }}
                        >
                          <Check className={cn('mr-2 h-4 w-4', option.name === field.value?.name ? 'opacity-100' : 'opacity-0')} />
                          {'flag' in option && option.flag && <span className="mr-2">{option.flag}</span>}
                          {`${option.name} (${'currency' in option ? option.currency : option.countryCode})`}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CountryStateCityInput;
