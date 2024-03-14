'use client';

import { FC, Fragment } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form/form';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/Select/select';
import { Button } from '@/components/ui/Button/button';
import { preferredDatetimeSchemaType } from '..';
import { PreferredHourContent } from '@/components/ui/Select/PreferredDatetime/PreferredTime/PreferredHourContent';
import { PreferredMinuteContent } from '@/components/ui/Select/PreferredDatetime/PreferredTime/PreferredMinuteContent';

const MAX_PREFERRED_TIME_LENGTH = 3;

type Props = {
  preferredDateIndex: number;
};
export const PreferredTime: FC<Props> = ({ preferredDateIndex }: Props) => {
  const { control } = useFormContext<preferredDatetimeSchemaType>();
  const {
    fields: preferredTimeFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `preferredDatetime.${preferredDateIndex}.preferredTime` as 'preferredDatetime.0.preferredTime',
  });

  console.log('preferredTimeコンポーネント');
  console.log('%o', preferredTimeFields);

  return (
    <div>
      {preferredTimeFields.map((preferredTimeItem, preferredTimeIndex) => {
        console.log('%o', preferredTimeItem);
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
                    <Select {...restField} onValueChange={onChange}>
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
                name={`preferredDatetime.${preferredDateIndex}.preferredTime.${preferredTimeIndex}.minute`}
                render={({ field: { ref, onChange, ...restField } }) => (
                  <FormItem>
                    <Select {...restField} onValueChange={onChange}>
                      <FormControl>
                        <SelectTrigger ref={ref} className='w-[145px]'>
                          <SelectValue placeholder='分' />
                        </SelectTrigger>
                      </FormControl>
                      <PreferredMinuteContent />
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='button'
                variant='destructive'
                onClick={() => {
                  console.log('%o', preferredTimeFields);
                  remove(preferredTimeIndex);
                  console.log('%o', preferredTimeFields);
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
              minute: '00',
            });
          }}
        >
          時間の追加
        </Button>
      </div>
    </div>
  );
};
