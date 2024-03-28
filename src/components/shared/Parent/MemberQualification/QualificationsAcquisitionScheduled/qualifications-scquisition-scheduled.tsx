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
  qualificationsAcquisitionScheduled:
    | {
        id: number;
        name: string;
        required: boolean;
      }[]
    | [];
  handleQualificationsAcquisitionScheduledChange: (
    checked: boolean,
    value: number[],
    QualificationsAcquisitionScheduledId: number,
  ) => void;
  isHidden: boolean;
};
export const QualificationsAcquisitionScheduled: FC<Props> = ({
  qualificationsAcquisitionScheduled,
  handleQualificationsAcquisitionScheduledChange,
  isHidden,
}: Props) => {
  const { control } = useFormContext<MemberQualificationsSchemaType>();

  if (isHidden) {
    return <></>;
  }

  return (
    <FormField
      control={control}
      name='memberQualifications.qualificationsAcquisitionScheduled'
      render={() => (
        <FormItem>
          <div className='flex flex-row'>
            <FormLabel className='w-36'>取得予定（1年以内）の資格・免許</FormLabel>
            <div>
              <FormMessage className='mb-2 leading-none' />
              <div className='flex flex-row gap-x-4'>
                {qualificationsAcquisitionScheduled.map(
                  (qualificationAcquisitionScheduled, index) => (
                    <FormField
                      key={index}
                      control={control}
                      name='memberQualifications.qualificationsAcquisitionScheduled'
                      render={({ field: { value, onChange, ...restField } }) => (
                        <FormItem key={index} className='flex flex-row items-center space-y-0'>
                          <FormControl>
                            <Checkbox
                              {...restField}
                              checked={value?.includes(qualificationAcquisitionScheduled.id)}
                              onCheckedChange={(checked: boolean) =>
                                handleQualificationsAcquisitionScheduledChange(
                                  checked,
                                  value,
                                  qualificationAcquisitionScheduled.id,
                                )
                              }
                            />
                          </FormControl>
                          <FormLabel className='ml-1 text-sm font-normal'>
                            {qualificationAcquisitionScheduled.name}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
