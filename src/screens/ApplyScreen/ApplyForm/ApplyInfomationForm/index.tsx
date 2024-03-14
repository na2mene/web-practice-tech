'use client';

import { useApplyInformationForm } from '@/screens/ApplyScreen/ApplyForm/ApplyInfomationForm/useApplyInformationForm';
import { MemberCareer } from '@/components/ui/Select/MemberCareer';
import { Qualifications } from '@/components/ui/Checkbox/Qualifications';
import { PreferredDatetime } from '@/components/ui/Select/PreferredDatetime';

type Props = {
  qualifications:
    | {
        id: number;
        name: string;
        required: boolean;
      }[]
    | [];
};

export const ApplyInfomationForm = ({ qualifications }: Props) => {
  const { handleQualificationChange } = useApplyInformationForm();

  return (
    <>
      <div>
        <MemberCareer />
      </div>

      <div className='flex flex-row gap-x-4'>
        <Qualifications
          qualifications={qualifications}
          handleQualificationChange={handleQualificationChange}
        />
      </div>

      <div>
        <PreferredDatetime />
      </div>
    </>
  );
};
