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

type PasswordSchemaType = {
  password: string | undefined;
};

const passwordDefaultValidation: PartialFormValidation<PasswordSchemaType> = {
  password: z
    .string()
    .min(1, { message: 'パスワードを入力してください' })
    .min(8, { message: '8文字以上のパスワードを入力してください' }),
};

const generatePasswordValidation = () => {
  return passwordDefaultValidation;
};

const Password: FC = () => {
  const { control } = useFormContext<PasswordSchemaType>();

  return (
    <FormField
      control={control}
      name='password'
      render={({ field }) => (
        <FormItem>
          <FormLabel>パスワード</FormLabel>
          <FormControl>
            <Input type='password' placeholder='パスワード' {...field} />
          </FormControl>
          <FormDescription>ここは説明箇所です.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Password, generatePasswordValidation };
