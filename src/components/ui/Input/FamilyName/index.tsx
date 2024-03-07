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

type FamilyNameSchemaType = {
  familyName: string;
};

const familyNameDefaultValidation: PartialFormValidation<FamilyNameSchemaType> = {
  familyName: z
    .string()
    .min(1, { message: '名字を入力してください' })
    .max(50, { message: '50文字以内で入力してください' }),
};

//
// NOTE: この画面では、必須、必須ではないみたいなものに対応するために、
//       一律でexportするのは関数とした.
//
const generateFamilyNameValidation = (isRequired: boolean = true) => {
  const familyNameValidation = isRequired
    ? familyNameDefaultValidation
    : {
        familyName: z.string().max(50, { message: '50文字以内で入力してください' }),
      };
  return familyNameValidation;
};

const FamilyName: FC = () => {
  const { control } = useFormContext<FamilyNameSchemaType>();

  return (
    <FormField
      control={control}
      name='familyName'
      render={({ field }) => (
        <FormItem className='flex-1'>
          <FormLabel>名字</FormLabel>
          <FormControl>
            <Input placeholder='山田' {...field} />
          </FormControl>
          <FormDescription>ここは説明箇所です.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { FamilyName, generateFamilyNameValidation };
