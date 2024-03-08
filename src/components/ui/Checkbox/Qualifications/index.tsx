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
import { Checkbox } from '@/components/ui/Checkbox/checkbox';

type QualificationSchemaType = {
  qualifications: number[];
};

const qualificationDefaultValidation: PartialFormValidation<QualificationSchemaType> = {
  qualifications: z.array(z.number()),
};

const generateQualificationValidation = (
  qualificationDataList: {
    id: number;
    name: string;
    required: boolean;
  }[],
) => {
  return {
    qualifications: qualificationDefaultValidation.qualifications.refine(
      (qualifications) => {
        const isRequiredIdList = qualificationDataList
          .filter((data) => data.required)
          .map((data) => data.id);
        return isRequiredIdList.some((requiredId) => qualifications.includes(requiredId));
      },
      {
        message:
          '応募条件を満たす資格/免許が選択されていません。お持ちの場合はチェックしてください。',
      },
    ),
  };
};

type Props = {
  qualifications:
    | {
        id: number;
        name: string;
        required: boolean;
      }[]
    | [];
  handleQualificationChange: (checked: boolean, value: number[], qualificationId: number) => void;
};
const Qualifications: FC<Props> = ({ qualifications, handleQualificationChange }: Props) => {
  const { control } = useFormContext<QualificationSchemaType>();

  return (
    <FormField
      control={control}
      name='qualifications'
      render={() => (
        <FormItem>
          <FormLabel>保有資格・免許</FormLabel>
          {qualifications.map((qualification, index) => (
            <FormField
              key={index}
              control={control}
              name='qualifications'
              render={({ field: { value, onChange, ...restField } }) => (
                <FormItem key={index}>
                  <FormControl>
                    <Checkbox
                      {...restField}
                      checked={value?.includes(qualification.id)}
                      onCheckedChange={(checked: boolean) =>
                        handleQualificationChange(checked, value, qualification.id)
                      }
                    />
                  </FormControl>
                  <FormLabel className='text-sm font-normal'>{qualification.name}</FormLabel>
                </FormItem>
              )}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Qualifications, generateQualificationValidation };
