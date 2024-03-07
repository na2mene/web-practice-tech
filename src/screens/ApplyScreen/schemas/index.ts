import { z } from 'zod';

import { generateFamilyNameValidation } from '@/components/ui/Input/FamilyName';
import { generateFamilyNameKanaValidation } from '@/components/ui/Input/FamilyNameKana';
import { generateFirstNameValidation } from '@/components/ui/Input/FirstName';
import { generateFirstNameKanaValidation } from '@/components/ui/Input/FirstNameKana';
import { generateBirthdayValidation } from '@/components/ui/Select/Birthday';
import { generateGenderValidation } from '@/components/ui/RadioGroup/Gender';
import { generateTelValidation } from '@/components/ui/Input/Tel';
import { generatePostalCodeValidation } from '@/components/ui/Input/PostalCode';

const createBasicInformationSchema = (minAge: number = 0) =>
  z.object({
    ...generateFamilyNameValidation(),
    ...generateFirstNameValidation(),
    ...generateFamilyNameKanaValidation(),
    ...generateFirstNameKanaValidation(),
    ...generateBirthdayValidation(minAge),
    ...generateGenderValidation(),
    ...generateTelValidation(),
    ...generatePostalCodeValidation(),

    prefectureId: z.string().min(1, { message: '都道府県を選択してください' }),
    cityId: z.string().min(1, { message: '市区町村を選択してください' }),
    town: z.string().max(100, { message: '町名・番地は100文字以内で入力してください' }).optional(),
    building: z.string().max(100, { message: '建物名は100文字以内で入力してください' }).optional(),

    email: z
      .string()
      .min(1, { message: 'メールアドレスを入力してください' })
      .max(100, { message: '100文字以内で入力してください' })
      .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, {
        message: '正しいメールアドレスを入力してください',
      })
      .refine(
        (email) => {
          //
          // NOTE: メールアドレス存在チェック
          //
          let data = {
            exist: true,
          };
          // const data = await isExistEmail(email);
          if (false) {
            return false;
          }
          return true;
        },
        {
          message: '登録済みのメールアドレスです',
        },
      ),
    password: z
      .string()
      .min(1, { message: 'パスワードを入力してください' })
      .min(8, { message: '8文字以上のパスワードを入力してください' }),

    //
    //  TODO: 就業状況選択の必須チェック
    //        numberで定義した場合で色々試したけど、
    //        refine系で定義しないとできない感じなので、
    //        定義を変更して対応
    //        本質的ではないので、やり方調べたい
    //
    employmentStatus: z.enum(['1', '2', '3'], {
      required_error: '就業状況を選択してください',
    }),
    // employmentStatus: z.union([
    //   z.undefined(),
    //   z.string().transform((val) => (val === '' ? undefined : Number(val))),
    // ]),
    // employmentStatus: z.preprocess(
    //   (value) => {
    //     if (value === undefined) {
    //       return NaN;
    //     }
    //     return Number(value);
    //   },
    //   z.number().min(1, { message: '就業状況を選択してください' }),
    // ),
    // employmentStatus: z.coerce
    //   .number()
    //   .min(1, { message: '就業状況を選択してください' })
    //   .optional(),
    // employmentStatus: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
  });

export type BasicInformationSchemaType = z.infer<ReturnType<typeof createBasicInformationSchema>>;

const createApplyInformationSchema = (qualificationDataList: Props['qualificationData']) =>
  z.object({
    memberCareer: z.string(),
    qualifications: z.array(z.number()).refine(
      (qualifications) => {
        const isRequiredIdList = qualificationDataList
          .filter((data) => data.required)
          .map((data) => data.id);
        return isRequiredIdList.some((requiredId) => qualifications.includes(requiredId));
      },
      {
        message:
          '応募条件を満たす資格/免許が選択されていません。お持ちの場合はチェックしてください。',
      },
    ),
    // TODO: 面接希望日時（行追加のネスト）あとで
    // prefferdDateTime: z.array(
    //   z.object({
    //     prefferdDate: z.date(),
    //     prefferdHour: z.array(z.string()),
    //     prefferdMinutes: z.array(z.string()),
    //   }),
    // ),
  });

export type ApplyInformationSchemaType = z.infer<ReturnType<typeof createApplyInformationSchema>>;

const mergeSchema = (
  basicInformationSchema: ReturnType<typeof createBasicInformationSchema>,
  applyInformationSchema: ReturnType<typeof createApplyInformationSchema>,
) => basicInformationSchema.merge(applyInformationSchema);

export type ApplyFormSchemaType = z.infer<ReturnType<typeof mergeSchema>>;

const attachCustomValidation = (schema: ReturnType<typeof mergeSchema>) =>
  //
  // TODO: superRefineもrefineも、onBlurの挙動ではなくonSubmitで発動するっぽい
  //       onBlurに設定しても意味ないので、手動で発火させる必要があるかもしれない
  //
  schema.superRefine(async (args, ctx) => {
    const { postalCode, prefectureId, cityId } = args;
  });

type Props = {
  qualificationData: {
    id: number;
    name: string;
    required: boolean;
  }[];
  jobCategoryData: {
    min_age: number;
  };
};

//
// NOTE: エントリーポイント.
//       可変項目のスキーマの動的生成と追加
//       テクいフォームだと、だいたいこの構造になるか
//
export const createSchema = (apiData: Props) => {
  let schema = null;

  //
  // NOTE: STEP1. フォームをコンポーネントごとに分割した単位でベースのスキーマを作成する
  //              ベースのスキーマとは、可変ではない項目を指す.
  //
  const basicInformationSchema = createBasicInformationSchema(apiData.jobCategoryData.min_age);
  const applyInformationSchema = createApplyInformationSchema(apiData.qualificationData);

  //
  // NOTE: STEP2. すべて定義したら、mergeする
  //              これは対象フォーム全体のベーススキーマを表す
  //
  return mergeSchema(basicInformationSchema, applyInformationSchema);
};
