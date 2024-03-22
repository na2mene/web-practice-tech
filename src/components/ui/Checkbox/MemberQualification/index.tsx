import { FC, useState } from 'react';
import { z } from 'zod';
import { PartialFormValidation } from '@/libs/zod-utils';
import { useFormContext } from 'react-hook-form';

import { Qualifications } from '@/components/ui/Checkbox/MemberQualification/Qualifications';
import { QualificationsAcquisitionScheduledButton } from '@/components/ui/Button/QualificationsAcquisitionScheduled';
import { QualificationsAcquisitionScheduled } from '@/components/ui/Checkbox/MemberQualification/QualificationsAcquisitionScheduled';
import { FormField, FormMessage } from '@/components/ui/Form/form';

export type MemberQualificationsSchemaType = {
  memberQualifications: {
    qualifications: number[];
    qualificationsAcquisitionScheduled: number[];
  };
};

//
// NOTE: デッドコードだけど、構造を把握しやすい意味で残してみた
//
const memberQualificationsDefaultValidation: PartialFormValidation<MemberQualificationsSchemaType> =
  {
    memberQualifications: z.object({
      qualifications: z.array(z.number()),
      qualificationsAcquisitionScheduled: z.array(z.number()),
    }),
  };

const generateMemberQualificationValidation = (
  qualificationDataList: {
    id: number;
    name: string;
    required: boolean;
  }[],
) => {
  //
  // NOTE: 保有資格・免許と取得予定（1年以内）の資格・免許のそれぞれで同様のカスタムエラーを実装する
  //       相関チェックとしては、2項目を比較して、同じものをチェックしていたらエラー
  //
  const isRequiredIdList = qualificationDataList
    .filter((data) => data.required)
    .map((data) => data.id);

  return {
    memberQualifications: z
      .object({
        qualifications: z.array(z.number()),
        qualificationsAcquisitionScheduled: z.array(z.number()),
      })
      .superRefine(({ qualifications, qualificationsAcquisitionScheduled }, ctx) => {
        //
        // NOTE: qualificationsAcquisitionScheduledが存在するかどうかでバリデーションの範囲が変化する
        //       存在する場合は、全体のチェックボックスとして、バリデーションを計算する
        //
        if (qualificationsAcquisitionScheduled?.length === 0) {
          //
          // NOTE: qualificationsの応募条件を満たしているか.
          //       qualificationsの選択肢だけを基にバリデーションを組めばよい.
          //
          const hasRequiredIdForQualification = isRequiredIdList.some((requiredId) =>
            qualifications.includes(requiredId),
          );
          if (!hasRequiredIdForQualification) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                '応募条件を満たす資格/免許が選択されていません。お持ちの場合はチェックしてください。',
              path: ['qualifications'],
            });
          }
        } else {
          //
          // NOTE: qualifications と qualificationsAcquisitionScheduledを含めて、応募条件を満たしているか.
          //       選択されている場合のみ、バリデーションが発火するように制御している.
          //       重複を許可した形で、配列を統合して、必須資格のIdを持っていればOK
          //
          const mergeQualificationList = [...qualifications, ...qualificationsAcquisitionScheduled];
          const hasRequiredId = isRequiredIdList.some((requiredId) =>
            mergeQualificationList.includes(requiredId),
          );

          if (!hasRequiredId) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                '応募条件を満たす資格/免許が選択されていません。お持ちの場合はチェックしてください。',
              //
              // NOTE: 応募条件を満たしているかどうかは、一律、qualificationsで出力
              //
              path: ['qualifications'],
            });
          }

          //
          // NOTE: qualifications と qualificationsAcquisitionScheduledを
          //       比較して、同じものを選択されてしまっていないかのチェック
          //
          const isDuplicate = qualifications.some((value) =>
            qualificationsAcquisitionScheduled?.includes(value),
          );

          if (isDuplicate) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '保有資格・免許と取得予定の資格・免許は違う資格を選択してください。',
              //
              // NOTE: 保有資格と取得予定の資格の重複は、一律、qualificationsAcquisitionScheduledで出力
              //
              path: ['qualificationsAcquisitionScheduled'],
            });
          }
        }
      }),
  };
};

type Props = {
  qualifications:
    | {
        id: number;
        name: string;
        required: boolean;
      }[]
    | [];
  handleQualificationChange: (
    checked: boolean,
    value: number[],
    QualificationsAcquisitionScheduledId: number,
  ) => void;
  handleQualificationsAcquisitionScheduledChange: (
    checked: boolean,
    value: number[],
    QualificationsAcquisitionScheduledId: number,
  ) => void;
};
const MemberQualification: FC<Props> = ({
  qualifications,
  handleQualificationChange,
  handleQualificationsAcquisitionScheduledChange,
}: Props) => {
  const {
    formState: { errors },
  } = useFormContext<MemberQualificationsSchemaType>();

  const [isHiddenQASButton, setIsHiddenQASButton] = useState<boolean>(false);
  const [isHiddenQAS, setIsHiddenQAS] = useState<boolean>(true);

  return (
    <>
      <Qualifications
        qualifications={qualifications}
        handleQualificationChange={handleQualificationChange}
      />

      <QualificationsAcquisitionScheduledButton
        isHidden={isHiddenQASButton}
        onClick={() => {
          setIsHiddenQASButton(!isHiddenQASButton);
          setIsHiddenQAS(!isHiddenQAS);
        }}
      />

      <QualificationsAcquisitionScheduled
        qualificationsAcquisitionScheduled={qualifications}
        handleQualificationsAcquisitionScheduledChange={
          handleQualificationsAcquisitionScheduledChange
        }
        isHidden={isHiddenQAS}
      />

      {errors.memberQualifications?.message && (
        <FormField name='memberQualifications' render={() => <FormMessage />} />
      )}
    </>
  );
};

export { MemberQualification, generateMemberQualificationValidation };
