import { FC } from 'react';
import { z } from 'zod';
import { PartialFormValidation } from '@/libs/zod-utils';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form/form';
import { Input } from '@/components/ui/Input/input';

type firstNameSchema = {
  firstName: string;
};

const firstNameDefaultValidation: PartialFormValidation<firstNameSchema> = {
  firstName: z
    .string()
    .min(1, { message: '名前を入力してください' })
    .max(50, { message: '50文字以内で入力してください' }),
};

const generateFirstNameValidation = () => {
  return firstNameDefaultValidation;
};

const FirstName: FC = () => {
  const { control } = useFormContext<firstNameSchema>();

  return (
    <FormField
      control={control}
      name='firstName'
      render={({ field }) => (
        <FormItem className='flex-1'>
          <FormLabel>名前</FormLabel>
          <FormControl>
            <Input placeholder='太郎' {...field} />
          </FormControl>
          <FormDescription>ここは説明箇所です.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { FirstName, generateFirstNameValidation };
