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

type EmailSchemaType = {
  email: string | undefined;
};

const emailDefaultValidation: PartialFormValidation<EmailSchemaType> = {
  email: z
    .string()
    .min(1, { message: 'メールアドレスを入力してください' })
    .max(100, { message: '100文字以内で入力してください' })
    .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, {
      message: '正しいメールアドレスを入力してください',
    })
    .refine(
      (email) => {
        //
        // NOTE: メールアドレス存在チェック
        //
        let data = {
          exist: true,
        };
        // const data = await isExistEmail(email);
        if (false) {
          return false;
        }
        return true;
      },
      {
        message: '登録済みのメールアドレスです',
      },
    ),
};

const generateEmailValidation = () => {
  return emailDefaultValidation;
};

type Props = {
  handleEmailChange: (value: string) => void;
};
const Email: FC<Props> = ({ handleEmailChange }: Props) => {
  const { control } = useFormContext<EmailSchemaType>();

  return (
    <FormField
      control={control}
      name='email'
      render={({ field: { onChange, ...restField } }) => (
        <FormItem>
          <FormLabel>メールアドレス</FormLabel>
          <FormControl>
            <Input
              placeholder='メールアドレス'
              {...restField}
              onChange={(event) => {
                handleEmailChange(event.target.value);
              }}
            />
          </FormControl>
          <FormDescription>ここは説明箇所です.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Email, generateEmailValidation };
