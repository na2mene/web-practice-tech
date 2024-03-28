'use client';

import { FC, Fragment } from 'react';
import { z } from 'zod';
import { PartialFormValidation } from '@/libs/zod-utils';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { PreferredDate } from '@/components/shared/Parent/PreferredDatetime/PreferredDate/preferred-date';
import { PreferredTime } from '@/components/shared/Parent/PreferredDatetime/PreferredTime/preferred-time';
import { Button } from '@/components/ui/Button/button';
import { FormLabel, FormDescription } from '@/components/ui/Form/form';

export type preferredDatetimeSchemaType = {
  preferredDatetime: {
    preferredDate: string;
    preferredTime: {
      hour: string;
      minutes: string;
    }[];
  }[];
};

const preferredDatetimeDefaultValidation: PartialFormValidation<preferredDatetimeSchemaType> = {
  preferredDatetime: z
    .array(
      z.object({
        preferredDate: z.string().min(1, { message: '日付を選択してください' }),
        preferredTime: z.array(
          z.object({
            hour: z.string().min(1, { message: '時間を選択してください' }),
            minutes: z.string().min(1, { message: '分を選択してください' }),
          }),
        ),
      }),
    )
    //
    // NOTE: 日付の重複チェックと日付ごとの時分の重複チェック
    //
    .superRefine((preferredDatetime, ctx) => {
      // (e.g) { "2月28日 (火)": [0, 2], "2月25日 (土)": [1] }
      const dateMap: {
        [date: string]: number[];
      } = {};
      preferredDatetime.forEach(({ preferredDate, preferredTime }, datetimeIndex) => {
        if (dateMap[preferredDate]) {
          // 既にキーが存在する場合はインデックスを追加
          dateMap[preferredDate].push(datetimeIndex);
        } else {
          // キーが存在しない場合は新しい配列を作成
          dateMap[preferredDate] = [datetimeIndex];
        }

        //
        // NOTE: 時間の文字列をキーとしたマップを作成して、
        //       同じキーに対応するインデックスのリストを保持する
        //       (e.g) { "16:00": [0, 2], "17:00": [1] }
        //
        const timeMap: {
          [date: string]: number[];
        } = {};

        preferredTime.forEach(({ hour, minutes }, timeIndex) => {
          const timeString = `${hour}:${minutes}`;
          if (timeMap[timeString]) {
            // 既にキーが存在する場合はインデックスを追加
            timeMap[timeString].push(timeIndex);
          } else {
            // キーが存在しない場合は新しい配列を作成
            timeMap[timeString] = [timeIndex];
          }
        });

        // マップを走査して重複がある時間に対してエラーを追加
        Object.entries(timeMap).forEach(([timeString, indices]) => {
          if (indices.length > 1) {
            // 重複がある場合、すべてのインデックスに対してエラーを追加
            indices.forEach((targetIndex) => {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '時間が重複しています',
                path: [`${datetimeIndex}.preferredTime.${targetIndex}.hour`],
              });
            });
          }
        });
      });

      // マップを走査して重複がある時間に対してエラーを追加
      Object.entries(dateMap).forEach(([dateString, indices]) => {
        if (indices.length > 1) {
          // 重複がある場合、すべてのインデックスに対してエラーを追加
          indices.forEach((targetIndex) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '日付が重複しています',
              path: [`${targetIndex}.preferredDate`],
            });
          });
        }
      });
    }),
};

const generatepreferredDatetimeValidation = () => {
  return preferredDatetimeDefaultValidation;
};

const MAX_PREFERRED_DATETIME_LENGTH = 3;

type Props = {
  handlePreferredDateChange: (value: string, preferredDateIndex: number) => void;
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
const PreferredDatetime: FC<Props> = ({
  handlePreferredDateChange,
  handlePreferredTimeHourChange,
  handlePreferredTimeMinuteChange,
}: Props) => {
  const { control } = useFormContext<preferredDatetimeSchemaType>();
  const {
    fields: preferredDatetimeFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'preferredDatetime',
  });

  return (
    <Fragment>
      <FormLabel>面接希望日</FormLabel>
      <FormDescription>日程調整をスムーズにするポイント</FormDescription>
      <FormDescription>・本日から7日前後の日程を選択する</FormDescription>
      <FormDescription>・複数の日程を選択する</FormDescription>
      <FormDescription>
        ※選択した時間から1時間以内を希望時間とします。時間を選択しない場合は「終日可」と伝えます。面接の実施や日程は確定ではありません。
      </FormDescription>
      <div className='my-6'>
        {preferredDatetimeFields.map((preferredDateItem, preferredDateIndex) => {
          return (
            //
            // NOTE: ここがかなり重要っぽくて、useFieldArrayから配列を取得すると、
            //       要素ごとに一意のuuid振ってくれるので、それを使わないと、appendとかremoveの挙動がおかしくなる
            //       (e.g.) useFieldArrayの内部stateは正常なのに、
            //              UI側が削除したものが生きてて、削除してないものが削除しているように見えるといった感じ
            //
            <div className='my-8 max-w-fit' key={preferredDateItem.id}>
              <Fragment>
                <PreferredDate
                  handlePreferredDateChange={handlePreferredDateChange}
                  preferredDateIndex={preferredDateIndex}
                />
                <PreferredTime
                  handlePreferredTimeHourChange={handlePreferredTimeHourChange}
                  handlePreferredTimeMinuteChange={handlePreferredTimeMinuteChange}
                  preferredDateIndex={preferredDateIndex}
                />
                <div className='text-right'>
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={() => remove(preferredDateIndex)}
                  >
                    希望日を削除する
                  </Button>
                </div>
              </Fragment>
            </div>
          );
        })}
      </div>
      <Button
        disabled={preferredDatetimeFields.length >= MAX_PREFERRED_DATETIME_LENGTH}
        type='button'
        onClick={() =>
          append({
            preferredDate: '',
            preferredTime: [
              {
                hour: '',
                minutes: '00',
              },
            ],
          })
        }
      >
        面接希望日を追加する
      </Button>
    </Fragment>
  );
};

export { PreferredDatetime, generatepreferredDatetimeValidation };
