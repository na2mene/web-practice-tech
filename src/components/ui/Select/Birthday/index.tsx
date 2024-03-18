import { FC } from 'react';
import { z } from 'zod';
import { PartialFormValidation } from '@/libs/zod-utils';
import { useFormContext } from 'react-hook-form';
import { calcAcademicPeriodDate } from '@/utils/days';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form/form';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/Select/select';
import { Year } from '@/components/ui/Select/Birthday/Year';
import { Month } from '@/components/ui/Select/Birthday/Month';
import { Day } from '@/components/ui/Select/Birthday/Day';

export type BirthdaySchemaType = {
  birthday: {
    year: string;
    month: string;
    day: string;
  };
};

const birthdayDefaultValidation: PartialFormValidation<BirthdaySchemaType> = {
  birthday: z
    .object({
      year: z.string().min(1, { message: '生年月日をすべて選択してください' }),
      month: z.string().min(1, { message: '生年月日をすべて選択してください' }),
      day: z.string().min(1, { message: '生年月日をすべて選択してください' }),
    })
    .refine(
      ({ year, month, day }) => {
        //
        // NOTE: 生年月日の必須チェックをカスタムバリデーションに寄せた
        //       どれが1つでも選択されると、必須応募資格の年齢チェックが動作してしまうので
        //       許容できる範囲の動作だが、相関的にも担保したため、二重の実装
        //
        if (year === '' || month === '' || day === '') {
          return false;
        }
        return true;
      },
      {
        message: '生年月日をすべて選択してください',
        path: [''],
      },
    ),
};

const generateBirthdayValidation = (minAge: number = 0) => {
  return minAge === 0
    ? birthdayDefaultValidation
    : {
        birthday: birthdayDefaultValidation.birthday.refine(
          ({ year, month, day }) => {
            //
            // NOTE: 必須応募資格の年齢チェック
            //
            if (minAge !== 0) {
              const birthdayPeriod = calcAcademicPeriodDate(+year, +month, +day);
              const now = new Date();
              const jobPeriod = calcAcademicPeriodDate(
                now.getFullYear() + 1 - (minAge + 1),
                now.getMonth() + 1,
                now.getDate(),
              );
              // NOTE: チェック用途テスト
              if (birthdayPeriod <= 20230401) {
                // if (birthdayPeriod <= jobPeriod) {
                return false;
              }
            }
            return true;
          },
          {
            message: '応募条件を満たす年齢に達していません',
            path: [''],
          },
        ),
      };
};

type Props = {
  handleYearChange: (value: string) => void;
  handleMonthChange: (value: string) => void;
  handleDayChange: (value: string) => void;
  selectedYear: string;
  selectedMonth: string;
};
const Birthday: FC<Props> = ({
  handleYearChange,
  handleMonthChange,
  handleDayChange,
  selectedYear,
  selectedMonth,
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<BirthdaySchemaType>();

  return (
    <>
      <div className='flex flex-row gap-x-4'>
        <FormField
          control={control}
          name='birthday.year'
          render={({ field: { ref, onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>西暦</FormLabel>
              <Select {...restField} onValueChange={handleYearChange}>
                <FormControl>
                  <SelectTrigger ref={ref} className='w-[180px]'>
                    <SelectValue placeholder='西暦' />
                  </SelectTrigger>
                </FormControl>
                <Year />
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='birthday.month'
          render={({ field: { ref, onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>月</FormLabel>
              <Select {...restField} onValueChange={handleMonthChange}>
                <FormControl>
                  <SelectTrigger ref={ref} className='w-[180px]'>
                    <SelectValue placeholder='月' />
                  </SelectTrigger>
                </FormControl>
                <Month />
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='birthday.day'
          render={({ field: { ref, onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>日</FormLabel>
              <Select {...restField} onValueChange={handleDayChange}>
                <FormControl>
                  <SelectTrigger ref={ref} className='w-[180px]'>
                    <SelectValue placeholder='日' />
                  </SelectTrigger>
                </FormControl>
                <Day year={selectedYear} month={selectedMonth} />
              </Select>
            </FormItem>
          )}
        />
      </div>

      {errors.birthday?.year?.message ? (
        <FormField name='birthday.year' render={() => <FormMessage />} />
      ) : errors.birthday?.month?.message ? (
        <FormField name='birthday.month' render={() => <FormMessage />} />
      ) : errors.birthday?.day?.message ? (
        <FormField name='birthday.day' render={() => <FormMessage />} />
      ) : (
        <FormField name='birthday' render={() => <FormMessage />} />
      )}
    </>
  );
};

export { Birthday, generateBirthdayValidation };
