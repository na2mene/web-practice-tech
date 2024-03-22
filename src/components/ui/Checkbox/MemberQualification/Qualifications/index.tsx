import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form/form';
import { Checkbox } from '@/components/ui/Checkbox/checkbox';
import { MemberQualificationsSchemaType } from '..';

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
export const Qualifications: FC<Props> = ({ qualifications, handleQualificationChange }: Props) => {
  const { control } = useFormContext<MemberQualificationsSchemaType>();

  return (
    <FormField
      control={control}
      name='memberQualifications.qualifications'
      render={() => (
        <FormItem>
          <FormLabel>保有資格・免許</FormLabel>
          {qualifications.map((qualification, index) => (
            <FormField
              key={index}
              control={control}
              name='memberQualifications.qualifications'
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
