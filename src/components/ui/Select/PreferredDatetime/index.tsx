'use client';

import { FC, Fragment } from 'react';
import { z } from 'zod';
import { PartialFormValidation } from '@/libs/zod-utils';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { PreferredDate } from '@/components/ui/Select/PreferredDatetime/PreferredDate';
import { PreferredTime } from '@/components/ui/Select/PreferredDatetime/PreferredTime';
import { Button } from '@/components/ui/Button/button';
import { FormLabel, FormDescription } from '@/components/ui/Form/form';

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

const MAX_PREFERRED_DATETIME_LENGTH = 3;

const PreferredDatetime: FC = () => {
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

      {preferredDatetimeFields.map((preferredDateItem, preferredDateIndex) => {
        console.log(preferredDateItem);
        return (
          //
          // NOTE: ここがかなり重要っぽくて、useFieldArrayから配列を取得すると、
          //       要素ごとに一意のuuid振ってくれるので、それを使わないと、appendとかremoveの挙動がおかしくなる
          //       (e.g.) useFieldArrayの内部stateは正常なのに、
          //              UI側が削除したものが生きてて、削除してないものが削除しているように見えるといった感じ
          //
          <Fragment key={preferredDateItem.id}>
            <PreferredDate preferredDateIndex={preferredDateIndex} />
            <PreferredTime preferredDateIndex={preferredDateIndex} />
            <Button type='button' variant='destructive' onClick={() => remove(preferredDateIndex)}>
              希望日を削除する
            </Button>
          </Fragment>
        );
      })}
      <Button
        disabled={preferredDatetimeFields.length >= MAX_PREFERRED_DATETIME_LENGTH}
        type='button'
        onClick={() =>
          append({
            preferredDate: '',
            preferredTime: [
              {
                hour: '',
                minute: '00',
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
