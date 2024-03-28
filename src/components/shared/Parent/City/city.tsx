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
import { Select, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/Select/select';
import { SelectedPrefectureCity } from '@/components/shared/Parent/City/SelectedPrefectureCity/selected-prefecture-city';

export type CitySchemaType = {
  cityId: string;
};

const cityDefaultValidation: PartialFormValidation<CitySchemaType> = {
  cityId: z.string().min(1, { message: '市区町村を選択してください' }),
};

const generateCityValidation = () => {
  return cityDefaultValidation;
};

type Props = {
  selectedPrefecture: string;
};
const City: FC<Props> = ({ selectedPrefecture }: Props) => {
  const { control } = useFormContext<CitySchemaType>();

  return (
    <FormField
      name='cityId'
      control={control}
      render={({ field: { ref, onChange, ...restField } }) => (
        <FormItem>
          <FormLabel>市区町村</FormLabel>
          <Select {...restField} onValueChange={onChange}>
            <FormControl>
              <SelectTrigger ref={ref} className='w-[180px]'>
                <SelectValue placeholder='市区町村' />
              </SelectTrigger>
            </FormControl>
            {selectedPrefecture ? (
              <SelectedPrefectureCity prefectureCode={selectedPrefecture} />
            ) : (
              <SelectContent />
            )}
            <FormMessage />
          </Select>
        </FormItem>
      )}
    />
  );
};

export { City, generateCityValidation };
