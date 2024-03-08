import { FC } from 'react';
import { z } from 'zod';
import { PartialFormValidation } from '@/libs/zod-utils';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/Form/form';
import { Input } from '@/components/ui/Input/input';

type TownSchemaType = {
  town: string | undefined;
};

const townDefaultValidation: PartialFormValidation<TownSchemaType> = {
  town: z.string().max(100, { message: '町名・番地は100文字以内で入力してください' }).optional(),
};

const generateTownValidation = () => {
  return townDefaultValidation;
};

const Town: FC = () => {
  const { control } = useFormContext<TownSchemaType>();

  return (
    <FormField
      control={control}
      name='town'
      render={({ field }) => (
        <FormItem className='w-[380px]'>
          <FormControl>
            <Input placeholder='町名・番地' {...field} />
          </FormControl>
          <FormDescription>ここは説明箇所です.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Town, generateTownValidation };
