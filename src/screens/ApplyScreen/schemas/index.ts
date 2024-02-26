import { z } from 'zod';

import { calcAcademicPeriodDate } from '@/utils/days';
import { getZipcodeOrList } from '@/__generated_REST__/zipcloud/zipcloud';

const createBasicInformationBaseSchema = () =>
  z.object({
    familyName: z
      .string()
      // NOTE: min(1)で、必須項目を表現する
      .min(1, { message: '名字を入力してください' })
      .max(50, { message: '50文字以内で入力してください' }),
    firstName: z
      .string()
      .min(1, { message: '名前を入力してください' })
      .max(50, { message: '50文字以内で入力してください' }),

    familyNameKana: z
      .string()
      .min(1, { message: '名字（ひらがな）を入力してください' })
      .max(50, { message: '名字（ふりがな）は50文字以内で入力してください' })
      .regex(/^(?:[ぁ-ゞ]+)*$/, { message: '名字（ふりがな）はひらがなで入力してください' }),
    firstNameKana: z
      .string()
      .min(1, { message: '名前（ひらがな）を入力してください' })
      .max(50, { message: '名前（ふりがな）は50文字以内で入力してください' })
      .regex(/^(?:[ぁ-ゞ]+)*$/, { message: '名前（ふりがな）はひらがなで入力してください' }),

    year: z.string(),
    month: z.string(),
    day: z.string(),

    gender: z.enum(['female', 'male'], {
      required_error: '性別を選択してください',
    }),

    tel: z
      .string()
      .min(1, { message: '電話番号を入力してください' })
      .regex(/^\d{10,11}$/, { message: '正しい電話番号を入力してください' }),

    postalCode: z
      .string()
      .max(7, { message: '正しい郵便番号を入力してください' })
      .regex(/^\d{7}$/, { message: '正しい郵便番号を入力してください' })
      //
      // TODO: 必須ではないが、入力するならバリデーションを発火させたい場合の書き方？
      // @see: https://zenn.dev/kaz_z/articles/how-to-use-zod#%E5%85%A5%E5%8A%9B%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88%E3%81%AF%E3%83%90%E3%83%AA%E3%83%87%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%8C%E5%BF%85%E8%A6%81%E3%81%A0%E3%81%91%E3%81%A9%E3%80%81%E7%A9%BA%E3%81%AE%E3%81%BE%E3%81%BE%E3%81%A7%E3%82%82%E3%81%84%E3%81%84
      //
      .or(z.literal('')),
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
      }),
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
// .required({
//   familyName: true,
//   firstName: true,
//   familyNameKana: true,
//   firstNameKana: true,
//   gender: true,
//   tel: true,
//   postalCode: true,
//   prefecture: true,
//   city: true,
//   employmentStatus: true,
// });

export type BasicInformationSchemaType = z.infer<
  ReturnType<typeof createBasicInformationBaseSchema>
>;

const createApplyInformationBaseSchema = () =>
  z.object({
    // memberCareer: z.string().min(1, { message: '経験年数を選択してください' }),
    // TODO: 面接希望日時（行追加のネスト）あとで
    // prefferdDateTime: z.array(
    //   z.object({
    //     prefferdDate: z.date(),
    //     prefferdHour: z.array(z.string()),
    //     prefferdMinutes: z.array(z.string()),
    //   }),
    // ),
  });

const attachApplyInformationDynamicSchema = (
  applyInformationBaseSchema: ReturnType<typeof createApplyInformationBaseSchema>,
  qualifications: Props['qualificationData'],
) => {
  //
  // TODO: 多分動的だけど、refineで表現するしかなさそうな気がしたので、いったんコメントアウトする
  //

  // let dynamicSchema = z.object({});

  // qualifications.forEach((qualification, index) => {
  //   const key = `${qualification.name}_${index}`;
  //   let qualificationSchema = z.object({
  //     [key]: z.string(),
  //   });
  //   if (qualification.required) {
  //     qualificationSchema = z.object({
  //       [key]: z.string().min(1, { message: '必須項目です' }),
  //     });
  //   }
  //   dynamicSchema.merge(qualificationSchema);
  // });

  return applyInformationBaseSchema.merge(
    z.object({
      qualifications: z.number().array().optional(),
    }),
  );
};

export type ApplyInformationSchemaType = z.infer<
  ReturnType<typeof attachApplyInformationDynamicSchema>
>;

const mergeSchema = (
  basicInformationBaseSchema: ReturnType<typeof createBasicInformationBaseSchema>,
  applyInformationBaseSchema: ReturnType<typeof attachApplyInformationDynamicSchema>,
) => basicInformationBaseSchema.merge(applyInformationBaseSchema);

export type ApplyFormSchemaType = z.infer<ReturnType<typeof mergeSchema>>;

const attachBasicInformationValidation = (schema: ReturnType<typeof mergeSchema>, minAge: number) =>
  //
  // TODO: superRefineもrefineも、onBlurの挙動ではなくonSubmitで発動するっぽい
  //       onBlurに設定しても意味ないので、手動で発火させる必要があるかもしれない
  //
  schema.superRefine(async (args, ctx) => {
    const { year, month, day, postalCode, prefectureId, cityId, employmentStatus } = args;

    //
    // NOTE: 3項目での必須チェック
    //
    if (year === '' || month === '' || day === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: '生年月日をすべて選択してください',
        path: ['birthday'],
        //
        // NOTE: ここのエラーでコケた時に、後続のバリデーションを動作させたくない時に設定する
        //       その上で、z.NEVER;をreturnしてあげると、後続が実行されずに、
        //       ここのエラーで終わる
        // @see: https://zod.dev/?id=abort-early
        // fatal: true,
      });
      // return z.NEVER;
    }

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
      // if (birthdayPeriod <= 20230401) {
      if (birthdayPeriod <= jobPeriod) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: '応募条件を満たす年齢に達していません',
          path: ['birthday'],
        });
      }
    }

    //
    // NOTE: 郵便番号チェック
    // TODO: 7桁だけだと、大量に呼ばれてしまうので、他の条件も組み合わせたい
    //       例として、都道府県 or 市区町村が選択されていない時に実施するなど
    //
    if (postalCode.length === 7 && (!prefectureId || !cityId)) {
      //
      // TODO: UI側のonChangeで賄えそうなので、ここで定義する必要があるかは、
      //       要検討。いまだと二重でAPI呼ばれる感じの実装
      //
      const { status } = await getZipcodeOrList(
        {
          zipcode: postalCode,
        },
        {
          baseURL: 'https://zipcloud.ibsnet.co.jp',
        },
      );
      if (status !== 200) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '正しい郵便番号を入力してください',
          path: ['postalCode'],
        });
      }
    }

    //
    // NOTE: メールアドレス存在チェック
    // TODO: カスタムバリデーションを任意のタイミングで実行する方法を模索したい
    //
    // ↓イメージで、実装してない
    // if (特定の条件で発火させる) {
    // const data = await isExistEmail();
    // console.log(`メールアドレス存在チェック: ${email}`);
    // ctx.addIssue({
    //   code: z.ZodIssueCode.custom,
    //   message: '登録済みのメールアドレスです',
    //   path: ['email'],
    // });

    //
    //  TODO: 就業状況選択の必須チェック
    //        undefinedを許容したい関係で、ここで実装になってしまっている
    //
    // if (employmentStatus === undefined) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: '就業状況を選択してください',
    //     path: ['employmentStatus'],
    //   });
    // }
  });

//
// NOTE: superRefineのほうが柔軟的、だがこちらのほうがシンプル
//
// schema
//   .refine(
//     ({ year, month, day }) => {
//       if (year === '' || month === '' || day === '') {
//         return false;
//       }
//       return true;
//     },
//     {
//       message: '生年月日をすべて選択してください',
//       path: ['birthday'],
//     },
//   )
//   .refine(
//     ({ year, month, day }) => {
//       if (minAge !== 0) {
//         const birthdayPeriod = calcAcademicPeriodDate(+year, +month, +day);
//         const now = new Date();
//         const jobPeriod = calcAcademicPeriodDate(
//           now.getFullYear() + 1 - (minAge + 1),
//           now.getMonth() + 1,
//           now.getDate(),
//         );
//         // NOTE: チェック用途テスト
//         if (birthdayPeriod <= 20230401) {
//           // if (birthdayPeriod <= jobPeriod) {
//           return false;
//         }
//       }
//       return true;
//     },
//     {
//       message: '応募条件を満たす年齢に達していません',
//       path: ['birthday'],
//     },
//   );

// const attachApplyInformationValidation = (schema: ReturnType<typeof mergeSchema>) =>
//   schema.refine(
//     ({ qualifications }) => {
//       qualifications;
//       const { year, month, day } = data;
//       if (year !== null && month !== null && day !== null) {
//         return true;
//       }
//       return false;
//     },
//     {
//       message: '生年月日をすべて選択してください',
//       path: ['birthDay'],
//     },
//   );

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
  const basicInformationBaseSchema = createBasicInformationBaseSchema();
  const applyInformationBaseSchema = createApplyInformationBaseSchema();

  //
  // NOTE: STEP2. 状態によって可変するフォーム項目のスキーマをアタッチする.
  //              何かの条件によって、可変な項目はここで、それぞれのベーススキーマにアタッチする形で
  //              スキーマを仕上げていく
  //
  const applyInformationSchema = attachApplyInformationDynamicSchema(
    applyInformationBaseSchema,
    apiData.qualificationData,
  );

  //
  // NOTE: STEP3. すべて定義したら、mergeする
  //              これは対象フォーム全体のベーススキーマを表す
  //              Zodの型の問題で先に項目のマージを優先する.
  //
  const mergedSchema = mergeSchema(basicInformationBaseSchema, applyInformationSchema);

  //
  // NOTE: STEP4. 基本系以外のバリデーションを付与する
  //              例えば、相関チェック.
  //              生年月日が3項目である時、相関的にチェックが必要な場合を指す
  //
  schema = attachBasicInformationValidation(mergedSchema, apiData.jobCategoryData.min_age);
  // schema = attachApplyInformationValidation(schema);

  return schema;
};
