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

type firstNameKanaSchemaType = {
  firstNameKana: string;
};

const firstNameKanaDefaultValidation: PartialFormValidation<firstNameKanaSchemaType> = {
  firstNameKana: z
    .string()
    .min(1, { message: '名前（ひらがな）を入力してください' })
    .max(50, { message: '名前（ふりがな）は50文字以内で入力してください' })
    .regex(/^(?:[ぁ-ゞ]+)*$/, { message: '名前（ふりがな）はひらがなで入力してください' }),
};

const generateFirstNameKanaValidation = () => {
  return firstNameKanaDefaultValidation;
};

const FirstNameKana: FC = () => {
  const { control } = useFormContext<firstNameKanaSchemaType>();

  return (
    <FormField
      control={control}
      name='firstNameKana'
      render={({ field }) => (
        <FormItem className='flex-1'>
          <FormLabel>名前かな</FormLabel>
          <FormControl>
            <Input placeholder='たろう' {...field} />
          </FormControl>
          <FormDescription>ここは説明箇所です.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { FirstNameKana, generateFirstNameKanaValidation };
