import { z } from 'zod';

const createBasicInformationBaseSchema = () =>
  z
    .object({
      // NOTE: min(1)で、必須項目を表現するっぽい
      //       requiredは、スキーマとして存在するしないっぽい
      familyName: z
        .string()
        .min(1, { message: '名字を入力してください' })
        .max(50, { message: '50文字以内で入力してください' }),
      firstName: z
        .string()
        .min(1, { message: '名前を入力してください' })
        .max(50, { message: '50文字以内で入力してください' }),

      // TODO: ひらがなであることの表現
      familyNameKana: z
        .string()
        .min(1, { message: '名字（ひらがな）を入力してください' })
        .max(20, { message: '名字（ふりがな）は50文字以内で入力してください' }),
      firstNameKana: z
        .string()
        .min(1, { message: '名前（ひらがな）を入力してください' })
        .max(20, { message: '名前（ふりがな）は50文字以内で入力してください' }),

      // TODO: 相関生年月日チェック
      //       年齢チェック
      year: z.string().min(1, { message: '生年月日を選択してください' }),
      month: z.string().min(1, { message: '生年月日を選択してください' }),
      day: z.string().min(1, { message: '生年月日を選択してください' }),

      gender: z.coerce.number().min(1, { message: '性別を選択してください' }),

      // TODO: 電話番号フォーマットチェック
      tel: z.string().min(1, { message: '電話番号を入力してください' }),

      // TODO: 正しい郵便番号チェック
      //       郵便番号が見つからないチェック（API）
      postalCode: z.string(),
      prefectureId: z.string().min(1, { message: '都道府県を選択してください' }),
      cityId: z.string().min(1, { message: '市区町村を選択してください' }),
      town: z.string().max(100, { message: '町名・番地は100文字以内で入力してください' }),
      building: z.string().max(100, { message: '建物名は100文字以内で入力してください' }),

      // TODO: メールアドレスフォーマットチェック
      //       登録済みかどうかチェック
      email: z
        .string()
        .min(1, { message: 'メールアドレスを入力してください' })
        .max(100, { message: '100文字以内で入力してください' }),

      password: z.string().min(8, { message: '8文字以上のパスワードを入力してください' }),
      employmentStatus: z.number().min(1, { message: '就業状況を選択してください' }),
    })
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
    });

export type BasicInformationSchemaType = z.infer<
  ReturnType<typeof createBasicInformationBaseSchema>
>;

const createApplyInformationBaseSchema = () =>
  z.object({
    memberCareer: z.string().min(1, { message: '経験年数を選択してください' }),

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
  qualifications: {
    id: number;
    name: string;
    required: boolean;
  }[],
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
      qualifications: z.number().array(),
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

const attachBasicInformationValidation = (schema: ReturnType<typeof mergeSchema>) =>
  schema.refine(
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

//
// NOTE: エントリーポイント.
//       可変項目のスキーマの動的生成と追加
//       テクいフォームだと、だいたいこの構造になるか
//
export const createSchema = (
  qualifications: {
    id: number;
    name: string;
    required: boolean;
  }[] = [],
) => {
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
    qualifications,
  );

  //
  // NOTE: STEP3. すべて定義したら、mergeする
  //              これは対象フォーム全体のベーススキーマを表す
  //              Zodの型の問題で先に項目のマージを優先する.
  //
  const schema = mergeSchema(basicInformationBaseSchema, applyInformationSchema);

  //
  // NOTE: STEP4. 基本系以外のバリデーションを付与する
  //              例えば、相関チェック.
  //              生年月日が3項目である時、相関的にチェックが必要な場合を指す
  //
  attachBasicInformationValidation(schema);
  // attachApplyInformationValidation(schema);

  return schema;
};
