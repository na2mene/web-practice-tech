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
          <FormLabel>取得予定（1年以内）の資格・免許</FormLabel>
          {qualificationsAcquisitionScheduled.map((qualificationAcquisitionScheduled, index) => (
            <FormField
              key={index}
              control={control}
              name='memberQualifications.qualificationsAcquisitionScheduled'
              render={({ field: { value, onChange, ...restField } }) => (
                <FormItem key={index}>
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
                  <FormLabel className='text-sm font-normal'>
                    {qualificationAcquisitionScheduled.name}
                  </FormLabel>
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
