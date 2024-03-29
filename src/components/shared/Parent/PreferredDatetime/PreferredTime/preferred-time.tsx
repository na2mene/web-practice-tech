'use client';

import { FC, Fragment } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form/form';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/Select/select';
import { Button } from '@/components/ui/Button/button';
import { preferredDatetimeSchemaType } from '../preferred-datetime';
import { PreferredHourContent } from '@/components/shared/Parent/PreferredDatetime/PreferredTime/PreferredHourContent/preferred-hour-content';
import { PreferredMinutesContent } from '@/components/shared/Parent/PreferredDatetime/PreferredTime/PreferredMinutesContent/preferred-minutes-content';

const MAX_PREFERRED_TIME_LENGTH = 3;

type Props = {
  preferredDateIndex: number;
  handlePreferredTimeHourChange: (
    value: string,
    preferredDateIndex: number,
    preferredTimeIndex: number,
  ) => void;
  handlePreferredTimeMinuteChange: (
    value: string,
    preferredDateIndex: number,
    preferredTimeIndex: number,
  ) => void;
};
export const PreferredTime: FC<Props> = ({
  preferredDateIndex,
  handlePreferredTimeHourChange,
  handlePreferredTimeMinuteChange,
}: Props) => {
  const { control } = useFormContext<preferredDatetimeSchemaType>();
  const {
    fields: preferredTimeFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `preferredDatetime.${preferredDateIndex}.preferredTime` as 'preferredDatetime.0.preferredTime',
  });

  return (
    <div>
      {preferredTimeFields.map((preferredTimeItem, preferredTimeIndex) => {
        return (
          //
          // NOTE: ここがかなり重要っぽくて、useFieldArrayから配列を取得すると、
          //       要素ごとに一意のuuid振ってくれるので、それを使わないと、appendとかremoveの挙動がおかしくなる
          //       (e.g.) useFieldArrayの内部stateは正常なのに、
          //              UI側が削除したものが生きてて、削除してないものが削除しているように見えるといった感じ
          //
          <Fragment key={preferredTimeItem.id}>
            <div className='flex flex-row gap-x-4 mt-3'>
              <FormField
                control={control}
                name={`preferredDatetime.${preferredDateIndex}.preferredTime.${preferredTimeIndex}.hour`}
                render={({ field: { ref, onChange, ...restField } }) => (
                  <FormItem>
                    <Select
                      {...restField}
                      onValueChange={(value) =>
                        handlePreferredTimeHourChange(value, preferredDateIndex, preferredTimeIndex)
                      }
                    >
                      <FormControl>
                        <SelectTrigger ref={ref} className='w-[145px]'>
                          <SelectValue placeholder='時' />
                        </SelectTrigger>
                      </FormControl>
                      <PreferredHourContent />
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`preferredDatetime.${preferredDateIndex}.preferredTime.${preferredTimeIndex}.minutes`}
                render={({ field: { ref, onChange, ...restField } }) => (
                  <FormItem>
                    <Select
                      {...restField}
                      onValueChange={(value) =>
                        handlePreferredTimeMinuteChange(
                          value,
                          preferredDateIndex,
                          preferredTimeIndex,
                        )
                      }
                    >
                      <FormControl>
                        <SelectTrigger ref={ref} className='w-[145px]'>
                          <SelectValue placeholder='分' />
                        </SelectTrigger>
                      </FormControl>
                      <PreferredMinutesContent />
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='button'
                variant='destructive'
                onClick={() => {
                  remove(preferredTimeIndex);
                }}
              >
                時間を削除
              </Button>
            </div>
          </Fragment>
        );
      })}

      <div className='mt-6 mb-2'>
        <Button
          className='w-full'
          disabled={preferredTimeFields.length >= MAX_PREFERRED_TIME_LENGTH}
          type='button'
          onClick={() => {
            append({
              hour: '',
              minutes: '00',
            });
          }}
        >
          時間の追加
        </Button>
      </div>
    </div>
  );
};
