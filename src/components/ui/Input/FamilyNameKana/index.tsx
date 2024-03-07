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

type FamilyNameKanaSchema = {
  familyNameKana: string;
};

const familyNameKanaDefaultValidation: PartialFormValidation<FamilyNameKanaSchema> = {
  familyNameKana: z
    .string()
    .min(1, { message: '名字（ひらがな）を入力してください' })
    .max(50, { message: '名字（ふりがな）は50文字以内で入力してください' })
    .regex(/^(?:[ぁ-ゞ]+)*$/, { message: '名字（ふりがな）はひらがなで入力してください' }),
};

const generateFamilyNameKanaValidation = () => {
  return familyNameKanaDefaultValidation;
};

const FamilyNameKana: FC = () => {
  const { control } = useFormContext<FamilyNameKanaSchema>();

  return (
    <FormField
      control={control}
      name='familyNameKana'
      render={({ field }) => (
        <FormItem className='flex-1'>
          <FormLabel>名字かな</FormLabel>
          <FormControl>
            <Input placeholder='やまだ' {...field} />
          </FormControl>
          <FormDescription>ここは説明箇所です.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { FamilyNameKana, generateFamilyNameKanaValidation };
