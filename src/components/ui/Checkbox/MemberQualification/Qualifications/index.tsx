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
          <div className='flex flex-row'>
            <FormLabel className='w-36'>保有資格・免許</FormLabel>
            <div>
              <div className='flex flex-row gap-x-4'>
                {qualifications.map((qualification, index) => (
                  <div key={index} className='flex flex-row items-center'>
                    <FormField
                      key={index}
                      control={control}
                      name='memberQualifications.qualifications'
                      render={({ field: { value, onChange, ...restField } }) => (
                        <FormItem key={index} className='flex flex-row items-center space-y-0'>
                          <FormControl>
                            <Checkbox
                              {...restField}
                              checked={value?.includes(qualification.id)}
                              onCheckedChange={(checked: boolean) =>
                                handleQualificationChange(checked, value, qualification.id)
                              }
                            />
                          </FormControl>
                          <FormLabel className='ml-1 text-sm font-normal'>
                            {qualification.name}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
              <FormMessage className='mt-2' />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
