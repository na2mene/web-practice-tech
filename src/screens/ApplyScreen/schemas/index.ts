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
import { generateMemberQualificationValidation } from '@/components/ui/Checkbox/MemberQualification';
import { generatepreferredDatetimeValidation } from '@/components/ui/Select/PreferredDatetime';

//
// NOTE: BasicInformationコンポーネントのスキーマ
//
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
  });

//
// NOTE: Formもコンポーネントで分割されることが想像されるので、
//       分割されたコンポーネントで型が欲しいので出力する.
//
export type BasicInformationSchemaType = z.infer<ReturnType<typeof createBasicInformationSchema>>;

//
// NOTE: ApplyInformationコンポーネントのスキーマ
//
const createApplyInformationSchema = (qualificationDataList: Props['qualificationData']) =>
  z.object({
    ...generateMemberCareerValidation(),
    ...generateMemberQualificationValidation(qualificationDataList),
    ...generatepreferredDatetimeValidation(),
  });

//
// NOTE: Formもコンポーネントで分割されることが想像されるので、
//       分割されたコンポーネントで型が欲しいので出力する.
//
export type ApplyInformationSchemaType = z.infer<ReturnType<typeof createApplyInformationSchema>>;

//
// NOTE: 最終的にFormすべてのスキーマを作り上げる必要があるのでマージする.
//
const mergeSchema = (
  basicInformationSchema: ReturnType<typeof createBasicInformationSchema>,
  applyInformationSchema: ReturnType<typeof createApplyInformationSchema>,
) => basicInformationSchema.merge(applyInformationSchema);

//
// NOTE: Formをまとめる親コンポーネントが使用する型（useFormに渡す型）
//
export type ApplyFormSchemaType = z.infer<ReturnType<typeof mergeSchema>>;

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
//
export const createSchema = (apiData: Props) => {
  //
  // NOTE: STEP1. フォームをコンポーネントごとに分割した単位でのスキーマを作成する
  //
  const basicInformationSchema = createBasicInformationSchema(apiData.jobCategoryData.min_age);
  const applyInformationSchema = createApplyInformationSchema(apiData.qualificationData);

  //
  // TODO: STEP2. すべて定義したら、mergeする
  //
  return mergeSchema(basicInformationSchema, applyInformationSchema);
};
