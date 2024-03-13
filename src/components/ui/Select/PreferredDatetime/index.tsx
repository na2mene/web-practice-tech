'use client';

import { FC, Fragment } from 'react';
import { z } from 'zod';
import { PartialFormValidation } from '@/libs/zod-utils';
import { useFormContext, useFieldArray } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/Form/form';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/Select/select';
import { PreferredDateContent } from '@/components/ui/Select/PreferredDatetime/PreferredDateContent';
import { PreferredHourContent } from '@/components/ui/Select/PreferredDatetime/PreferredHourContent';
import { PreferredMinuteContent } from '@/components/ui/Select/PreferredDatetime/PreferredMinuteContent';
import { Button } from '@/components/ui/Button/button';

export type preferredDatetimeSchemaType = {
  preferredDatetime: {
    preferredDate: string;
    preferredTime: {
      hour: string;
      minute: string;
    }[];
  }[];
};

const preferredDatetimeDefaultValidation: PartialFormValidation<preferredDatetimeSchemaType> = {
  preferredDatetime: z.array(
    z.object({
      preferredDate: z.string(),
      preferredTime: z.array(
        z.object({
          hour: z.string(),
          minute: z.string(),
        }),
      ),
    }),
  ),
};

const generatepreferredDatetimeValidation = () => {
  return preferredDatetimeDefaultValidation;
};

type Props = {
  handlePreferredDatetimeChange: (value: string) => void;
};
const PreferredDatetime: FC<Props> = ({ handlePreferredDatetimeChange }: Props) => {
  const { control } = useFormContext<preferredDatetimeSchemaType>();
  const {
    fields: preferredDatetimeFields,
    append,
    replace,
    remove,
  } = useFieldArray({
    control,
    name: 'preferredDatetime',
  });

  return (
    <>
      {preferredDatetimeFields.map((preferredDatetime, preferredDateIndex) => {
        console.log(preferredDatetime);
        return (
          <Fragment key={`preferredDate-${preferredDateIndex}`}>
            <FormField
              control={control}
              name={`preferredDatetime.${preferredDateIndex}.preferredDate`}
              render={({ field: { ref, onChange, ...restField } }) => (
                <FormItem>
                  <FormLabel>面接希望日</FormLabel>
                  <FormDescription>日程調整をスムーズにするポイント</FormDescription>
                  <FormDescription>・本日から7日前後の日程を選択する</FormDescription>
                  <FormDescription>・複数の日程を選択する</FormDescription>
                  <FormDescription>
                    ※選択した時間から1時間以内を希望時間とします。時間を選択しない場合は「終日可」と伝えます。面接の実施や日程は確定ではありません。
                  </FormDescription>
                  <Select {...restField} onValueChange={onChange}>
                    <FormControl>
                      <SelectTrigger ref={ref} className='w-[430px]'>
                        <SelectValue placeholder='日付' />
                      </SelectTrigger>
                    </FormControl>
                    <PreferredDateContent />
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              {preferredDatetime.preferredTime.map((item, preferredTimeIndex) => {
                console.log(item);
                return (
                  <div
                    key={`preferredDate-${preferredDateIndex}-preferredTime-${preferredTimeIndex}`}
                  >
                    <div className='flex flex-row gap-x-4 mt-6'>
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
                        data-preferred-time-index={preferredTimeIndex}
                        onClick={(event) => {
                          debugger;
                          const position = event.currentTarget.dataset.preferredTimeIndex;
                          // const preferredDatetimeList = preferredDatetimeFields[
                          //   Number(position)
                          // ].preferredTime.filter((_, index) => {
                          //   index !== preferredTimeIndex;
                          // });

                          const preferredDatetimeList = preferredDatetimeFields[
                            preferredDateIndex
                          ].preferredTime.toSpliced(Number(position), 1);

                          // const values = [...preferredDatetimeFields];
                          const values = JSON.parse(JSON.stringify(preferredDatetimeFields));
                          values[preferredDateIndex].preferredTime = preferredDatetimeList;
                          replace(values);
                          // update(preferredDateIndex, {
                          //   ...preferredDatetimeFields[preferredDateIndex],
                          //   preferredTime: preferredDatetimeList,
                          // });
                        }}
                      >
                        時間を削除
                      </Button>
                    </div>
                  </div>
                );
              })}

              <Button
                disabled={preferredDatetimeFields[preferredDateIndex].preferredTime.length >= 3}
                type='button'
                onClick={() => {
                  const values = JSON.parse(JSON.stringify(preferredDatetimeFields));
                  values[preferredDateIndex].preferredTime.push({
                    hour: '',
                    minute: '00',
                  });
                  // update(preferredDateIndex, preferredDatetimeList[preferredDateIndex]);
                  replace(values);
                }}
              >
                時間の追加
              </Button>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export { PreferredDatetime, generatepreferredDatetimeValidation };
