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
// NOTE: schemaを構築するindex.tsは、ここの関数を呼び出して、展開して使用する.
//       呼び出し元イメージ: ...generateFamilyNameValidation(),
//
const generateFamilyNameValidation = () => {
  return familyNameDefaultValidation;
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
