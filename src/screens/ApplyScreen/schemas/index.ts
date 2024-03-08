import { z } from 'zod';

import { generateFamilyNameValidation } from '@/components/ui/Input/FamilyName';
import { generateFamilyNameKanaValidation } from '@/components/ui/Input/FamilyNameKana';
import { generateFirstNameValidation } from '@/components/ui/Input/FirstName';
import { generateFirstNameKanaValidation } from '@/components/ui/Input/FirstNameKana';
import { generateBirthdayValidation } from '@/components/ui/Select/Birthday';
import { generateGenderValidation } from '@/components/ui/RadioGroup/Gender';
import { generateTelValidation } from '@/components/ui/Input/Tel';
import { generatePostalCodeValidation } from '@/components/ui/Input/PostalCode';
import { generatePrefectureValidation } from '@/components/ui/Select/Prefecture';
import { generateCityValidation } from '@/components/ui/Select/City';
import { generateTownValidation } from '@/components/ui/Input/Town';
import { generateBuildingValidation } from '@/components/ui/Input/Building';
import { generateEmailValidation } from '@/components/ui/Input/Email';
import { generatePasswordValidation } from '@/components/ui/Input/Password';
import { generateEmploymentStatusValidation } from '@/components/ui/RadioGroup/EmploymentStatus';
import { generateMemberCareerValidation } from '@/components/ui/Select/MemberCareer';
import { generateQualificationValidation } from '@/components/ui/Checkbox/Qualifications';

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
    ...generatePrefectureValidation(),
    ...generateCityValidation(),
    ...generateTownValidation(),
    ...generateBuildingValidation(),
    ...generateEmailValidation(),
    ...generatePasswordValidation(),
    ...generateEmploymentStatusValidation(),

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
    ...generateMemberCareerValidation(),
    ...generateQualificationValidation(qualificationDataList),

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
