import { z } from 'zod';

//
// NOTE: z.objectでまずは、スキーマを定義する
//       これは分割した分まず定義する
//

const basicInformationObjectSchema = z.object({
  familyName: z.string().max(20, { message: '20文字以内で入力してください' }),
  firstName: z.string().max(20, { message: '20文字以内で入力してください' }),
  familyNameKana: z.string().max(20, { message: '20文字以内で入力してください' }),
  firstNameKana: z.string().max(20, { message: '20文字以内で入力してください' }),
  year: z.string(),
  month: z.string(),
  day: z.string().nullable(),
  gender: z.string().max(20, { message: '20文字以内で入力してください' }),
  tel: z.string().max(20, { message: '20文字以内で入力してください' }),
  postalCode: z.string().max(20, { message: '20文字以内で入力してください' }),
  prefecture: z.string().max(20, { message: '20文字以内で入力してください' }),
  city: z.string().max(20, { message: '20文字以内で入力してください' }),
  town: z.string().max(20, { message: '20文字以内で入力してください' }),
  building: z.string().max(20, { message: '20文字以内で入力してください' }),
  email: z.string().max(20, { message: '20文字以内で入力してください' }),
  password: z.string().max(20, { message: '20文字以内で入力してください' }),
  employmentStatus: z.string().max(20, { message: '20文字以内で入力してください' }),
});

const applyInformationObjectSchema = z.object({
  MemberCareer: z.string().max(20, { message: '20文字以内で入力してください' }),
  qualification: z.string().nullable(),
  prefferdDateTime: z.array(
    z.object({
      prefferdDate: z.date(),
      prefferdHour: z.array(z.string()),
      prefferdMinutes: z.array(z.string()),
    }),
  ),
});

//
// NOTE: すべて定義したら、ぜんぶmergeする
//       これはFormをつかさどる親のコンポーネントで使うスキーマ
//

const mergedApplyFormSchema = basicInformationObjectSchema.merge(applyInformationObjectSchema);

//
// NOTE: 次に追加で生じるバリデーションを付与する
//       こうしないとZodの型の問題が生じる
//       refineを使うとZodObject型からZodEffects型となりmergeすることができないため
//

export const basicInformationFormSchema = mergedApplyFormSchema
  .required({
    familyName: true,
    firstName: true,
    familyNameKana: true,
    firstNameKana: true,
    gender: true,
    tel: true,
    postalCode: true,
    prefecture: true,
    city: true,
    employmentStatus: true,
  })
  .refine(
    (data) => {
      const { year, month, day } = data;
      if (year !== null && month !== null && day !== null) {
        return true;
      }
      return false;
    },
    {
      message: '生年月日をすべて選択してください',
      path: ['birthDay'],
    },
  );

export const applyInformationFormSchema = mergedApplyFormSchema.required({
  MemberCareer: true,
  qualification: true,
});

//
// NOTE: 最後に型を出力して終わり
//

export type BasicInformationFormSchemaType = z.infer<typeof basicInformationFormSchema>;
export type ApplyInformationFormSchemaType = z.infer<typeof applyInformationFormSchema>;
export type ApplyFormSchemaType = z.infer<typeof mergedApplyFormSchema>;
