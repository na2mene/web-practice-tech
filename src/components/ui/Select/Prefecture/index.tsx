import { FC } from 'react';
import { z } from 'zod';
import { PartialFormValidation } from '@/libs/zod-utils';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form/form';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/Select/select';
import { PrefectureContent } from '@/components/ui/Select/Prefecture/Content';

export type PrefectureSchemaType = {
  prefectureId: string;
};

const prefectureDefaultValidation: PartialFormValidation<PrefectureSchemaType> = {
  prefectureId: z.string().min(1, { message: '都道府県を選択してください' }),
};

const generatePrefectureValidation = () => {
  return prefectureDefaultValidation;
};

type Props = {
  handlePrefectureChange: (value: string) => void;
};
const Prefecture: FC<Props> = ({ handlePrefectureChange }: Props) => {
  const { control } = useFormContext<PrefectureSchemaType>();

  return (
    <FormField
      control={control}
      name='prefectureId'
      render={({ field: { ref, onChange, ...restField } }) => (
        <FormItem>
          <FormLabel>都道府県</FormLabel>
          <Select {...restField} onValueChange={handlePrefectureChange}>
            <FormControl>
              <SelectTrigger ref={ref} className='w-[180px]'>
                <SelectValue placeholder='都道府県' />
              </SelectTrigger>
            </FormControl>
            <PrefectureContent />
            <FormMessage />
          </Select>
        </FormItem>
      )}
    />
  );
};

export { Prefecture, generatePrefectureValidation };
