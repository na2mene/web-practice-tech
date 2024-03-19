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

type TelSchemaType = {
  tel: string;
};

const telDefaultValidation: PartialFormValidation<TelSchemaType> = {
  tel: z
    .string()
    .min(1, { message: '電話番号を入力してください' })
    .max(13, { message: '正しい電話番号を入力してください' })
    .regex(/^(?:\d{2,5}-?\d{1,4}-?\d{4}|\d{10,11})$/, {
      message: '正しい電話番号を入力してください',
    }),
};

const generateTelValidation = () => {
  return telDefaultValidation;
};

const Tel: FC = () => {
  const { control } = useFormContext<TelSchemaType>();

  return (
    <FormField
      control={control}
      name='tel'
      render={({ field }) => (
        <FormItem>
          <FormLabel>電話番号</FormLabel>
          <FormControl>
            <Input className='w-[180px]' placeholder='09012345678' {...field} />
          </FormControl>
          <FormDescription>ここは説明箇所です.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Tel, generateTelValidation };
