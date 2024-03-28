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

type PostalCodeSchemaType = {
  postalCode: string;
};

const postalCodeDefaultValidation: PartialFormValidation<PostalCodeSchemaType> = {
  postalCode: z
    .string()
    .regex(/^(?:\d{7}|\d{3}-\d{4})$/, { message: '正しい郵便番号を入力してください' })
    //
    // TODO: 必須ではないが、入力するならバリデーションを発火させたい場合の書き方？
    // @see: https://zenn.dev/kaz_z/articles/how-to-use-zod#%E5%85%A5%E5%8A%9B%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88%E3%81%AF%E3%83%90%E3%83%AA%E3%83%87%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%8C%E5%BF%85%E8%A6%81%E3%81%A0%E3%81%91%E3%81%A9%E3%80%81%E7%A9%BA%E3%81%AE%E3%81%BE%E3%81%BE%E3%81%A7%E3%82%82%E3%81%84%E3%81%84
    //
    .or(z.literal('')),
};

const generatePostalCodeValidation = () => {
  return postalCodeDefaultValidation;
};

type Props = {
  handlePostalCodeChange: (value: string) => void;
};
const PostalCode: FC<Props> = ({ handlePostalCodeChange }: Props) => {
  const { control } = useFormContext<PostalCodeSchemaType>();

  return (
    <FormField
      control={control}
      name='postalCode'
      render={({ field: { onChange, ...restField } }) => (
        <FormItem>
          <FormLabel>郵便番号</FormLabel>
          <FormControl>
            <Input
              className='w-[180px]'
              placeholder='2610011'
              {...restField}
              onChange={(event) => handlePostalCodeChange(event.target.value)}
            />
          </FormControl>
          <FormDescription>ここは説明箇所です.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { PostalCode, generatePostalCodeValidation };
