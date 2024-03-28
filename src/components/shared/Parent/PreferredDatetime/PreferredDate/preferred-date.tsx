'use client';

import { FC, Fragment } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form/form';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/Select/select';
import { PreferredDateContent } from '@/components/shared/Parent/PreferredDatetime/PreferredDate/PreferredDateContent/preferred-date-content';
import { preferredDatetimeSchemaType } from '../preferred-datetime';

type Props = {
  preferredDateIndex: number;
  handlePreferredDateChange: (value: string, preferredDateIndex: number) => void;
};

export const PreferredDate: FC<Props> = ({
  preferredDateIndex,
  handlePreferredDateChange,
}: Props) => {
  const { control } = useFormContext<preferredDatetimeSchemaType>();

  return (
    <Fragment key={`preferredDatetime-${preferredDateIndex}-preferredDate`}>
      <FormField
        control={control}
        name={`preferredDatetime.${preferredDateIndex}.preferredDate`}
        render={({ field: { ref, onChange, ...restField } }) => (
          <FormItem>
            <Select
              {...restField}
              onValueChange={(value) => handlePreferredDateChange(value, preferredDateIndex)}
            >
              <FormControl>
                <SelectTrigger ref={ref} className='w-[430px]'>
                  <SelectValue placeholder='日付' />
                </SelectTrigger>
              </FormControl>
              <PreferredDateContent />
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </Fragment>
  );
};
