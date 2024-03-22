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
        qualifications: z.array(z.number()).refine(
          (qualifications) => {
            return isRequiredIdList.some((requiredId) => qualifications.includes(requiredId));
          },
          {
            message:
              '応募条件を満たす資格/免許が選択されていません。お持ちの場合はチェックしてください。',
          },
        ),
        qualificationsAcquisitionScheduled: z
          .array(z.number())
          .optional()
          .refine(
            (qualificationsAcquisitionScheduled) => {
              //
              // NOTE: こちらは基本的にバリデーションをかけないが、入力があるときだけ発火させたいので、
              //       空の場合は、基本的にtrueを返す.
              //
              if (qualificationsAcquisitionScheduled?.length === 0) return true;
              return isRequiredIdList.some((requiredId) =>
                qualificationsAcquisitionScheduled?.includes(requiredId),
              );
            },
            {
              message:
                '応募条件を満たす資格/免許が選択されていません。お持ちの場合はチェックしてください。',
            },
          ),
      })
      .refine(
        ({ qualifications, qualificationsAcquisitionScheduled }) => {
          //
          // NOTE: 相関チェックとしても、入力があるときだけバリデーションロジックが走るようにする.
          //
          if (qualificationsAcquisitionScheduled?.length === 0) return true;
          const isDuplicate = qualifications.some((value) =>
            qualificationsAcquisitionScheduled?.includes(value),
          );
          if (isDuplicate) {
            return false;
          }
          return true;
        },
        {
          message: '保有資格・免許と取得予定の資格・免許は違う資格を選択してください。',
        },
      ),
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
