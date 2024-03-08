import { FC } from 'react';
import { z } from 'zod';
import { PartialFormValidation } from '@/libs/zod-utils';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/Form/form';
import { Input } from '@/components/ui/Input/input';

type BuildingSchemaType = {
  building: string | undefined;
};

const buildingDefaultValidation: PartialFormValidation<BuildingSchemaType> = {
  building: z.string().max(100, { message: '建物名は100文字以内で入力してください' }).optional(),
};

const generateBuildingValidation = () => {
  return buildingDefaultValidation;
};

const Building: FC = () => {
  const { control } = useFormContext<BuildingSchemaType>();

  return (
    <FormField
      control={control}
      name='building'
      render={({ field }) => (
        <FormItem className='w-[380px]'>
          <FormControl>
            <Input placeholder='建物名' {...field} />
          </FormControl>
          <FormDescription>ここは説明箇所です.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Building, generateBuildingValidation };
