import { FC } from 'react';
import { z } from 'zod';
import { PartialFormValidation } from '@/libs/zod-utils';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup/radio-group';

type EmploymentStatusSchemaType = {
  employmentStatus: '1' | '2' | '3' | '';
};

const employmentStatusDefaultValidation: PartialFormValidation<EmploymentStatusSchemaType> = {
  //
  //  TODO: 就業状況選択の必須チェック
  //        numberで定義した場合で色々試したけど、
  //        refine系で定義しないとできない感じなので、
  //        定義を変更して対応
  //        本質的ではないので、やり方調べたい
  //
  employmentStatus: z.enum(['1', '2', '3'], {
    required_error: '就業状況を選択してください',
  }),
};

const generateEmploymentStatusValidation = () => {
  return employmentStatusDefaultValidation;
};

const EmploymentStatus: FC = () => {
  const { control } = useFormContext<EmploymentStatusSchemaType>();

  return (
    <FormField
      control={control}
      name='employmentStatus'
      render={({ field: { value, onChange, ...restField } }) => (
        <FormItem className='space-y-3'>
          <FormLabel>就業状況</FormLabel>
          <FormControl>
            <RadioGroup
              {...restField}
              aria-label='就業状況'
              className='flex items-center space-x-2'
              onValueChange={onChange}
            >
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='1' id='on' />
                </FormControl>
                <FormLabel className='font-normal' htmlFor='on'>
                  就業中
                </FormLabel>
              </FormItem>

              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='2' id='off' />
                </FormControl>
                <FormLabel className='font-normal' htmlFor='off'>
                  離職中
                </FormLabel>
              </FormItem>

              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='3' id='student' />
                </FormControl>
                <FormLabel className='font-normal' htmlFor='student'>
                  在学中
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { EmploymentStatus, generateEmploymentStatusValidation };
