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

type genderSchemaType = {
  gender: 'female' | 'male';
};

const genderDefaultValidation: PartialFormValidation<genderSchemaType> = {
  gender: z.enum(['female', 'male'], {
    required_error: '性別を選択してください',
  }),
};

const generateGenderValidation = () => {
  return genderDefaultValidation;
};

type Props = {
  handleGenderChange: (value: string) => void;
};
const Gender: FC<Props> = ({ handleGenderChange }: Props) => {
  const { control } = useFormContext<genderSchemaType>();

  return (
    <FormField
      control={control}
      name='gender'
      render={({ field: { value, onChange, ...restField } }) => (
        <FormItem className='space-y-3'>
          <FormLabel>性別</FormLabel>
          <FormControl>
            <RadioGroup
              {...restField}
              aria-label='性別'
              className='flex items-center space-x-2'
              defaultValue={`${value}`}
              onValueChange={handleGenderChange}
            >
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='female' id='female' />
                </FormControl>
                <FormLabel className='font-normal' htmlFor='female'>
                  女性
                </FormLabel>
              </FormItem>

              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='male' id='male' />
                </FormControl>
                <FormLabel className='font-normal' htmlFor='male'>
                  男性
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

export { Gender, generateGenderValidation };
