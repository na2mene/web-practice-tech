'use client';
import { useState } from 'react';

import { useApplyInformationForm } from '@/screens/ApplyScreen/ApplyForm/ApplyInfomationForm/useApplyInformationForm';
import { MemberCareer } from '@/components/ui/Select/MemberCareer';
import { MemberQualification } from '@/components/ui/Checkbox/MemberQualification';
import { Qualifications } from '@/components/ui/Checkbox/MemberQualification/Qualifications';
import { QualificationsAcquisitionScheduledButton } from '@/components/ui/Button/QualificationsAcquisitionScheduled';
import { QualificationsAcquisitionScheduled } from '@/components/ui/Checkbox/MemberQualification/QualificationsAcquisitionScheduled';
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

      <div className='flex flex-row gap-x-4'>
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
