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
import { MemberCareerContent } from '@/components/ui/Select/MemberCareer/Content';

export type MemberCareerSchemaType = {
  memberCareer: string;
};

const memberCareerDefaultValidation: PartialFormValidation<MemberCareerSchemaType> = {
  memberCareer: z.string(),
};

const generateMemberCareerValidation = () => {
  return memberCareerDefaultValidation;
};

const MemberCareer: FC = () => {
  const { control } = useFormContext<MemberCareerSchemaType>();

  return (
    <FormField
      control={control}
      name='memberCareer'
      render={({ field: { ref, onChange, ...restField } }) => (
        <FormItem>
          <FormLabel>経験年数</FormLabel>
          <Select {...restField} onValueChange={onChange}>
            <FormControl>
              <SelectTrigger ref={ref} className='w-[180px]'>
                <SelectValue placeholder='未設定' />
              </SelectTrigger>
            </FormControl>
            <MemberCareerContent />
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { MemberCareer, generateMemberCareerValidation };
