'use client';
import { useState } from 'react';

import { useApplyInformationForm } from '@/screens/ApplyScreen/ApplyForm/ApplyInfomationForm/useApplyInformationForm';
import { MemberCareer } from '@/components/ui/Select/MemberCareer/member-career';
import { MemberQualification } from '@/components/shared/Parent/MemberQualification';
import { Qualifications } from '@/components/shared/Parent/MemberQualification/Qualifications/qualifications';
import { QualificationsAcquisitionScheduledButton } from '@/components/ui/Button/qualifications-scquisition-scheduled-button';
import { QualificationsAcquisitionScheduled } from '@/components/shared/Parent/MemberQualification/QualificationsAcquisitionScheduled/qualifications-scquisition-scheduled';
import { PreferredDatetime } from '@/components/shared/Parent/PreferredDatetime/preferred-datetime';

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
  const {
    handleQualificationChange,
    handleQualificationsAcquisitionScheduledChange,
    handlePreferredDateChange,
    handlePreferredTimeHourChange,
    handlePreferredTimeMinuteChange,
  } = useApplyInformationForm();

  return (
    <>
      <div>
        <MemberCareer />
      </div>

      <div className='flex flex-col gap-y-4'>
        <MemberQualification
          qualifications={qualifications}
          handleQualificationChange={handleQualificationChange}
          handleQualificationsAcquisitionScheduledChange={
            handleQualificationsAcquisitionScheduledChange
          }
        />
      </div>

      <div>
        <PreferredDatetime
          handlePreferredDateChange={handlePreferredDateChange}
          handlePreferredTimeHourChange={handlePreferredTimeHourChange}
          handlePreferredTimeMinuteChange={handlePreferredTimeMinuteChange}
        />
      </div>
    </>
  );
};
