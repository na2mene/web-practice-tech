'use client';

import { FormField, FormMessage } from '@/components/ui/Form/form';
import { useBasicInformaionForm } from './useBasicInformationForm';
import { FamilyName } from '@/components/ui/Input/FamilyName';
import { FirstName } from '@/components/ui/Input/FirstName';
import { FamilyNameKana } from '@/components/ui/Input/FamilyNameKana';
import { FirstNameKana } from '@/components/ui/Input/FirstNameKana';
import { Birthday } from '@/components/ui/Select/Birthday';
import { Gender } from '@/components/ui/RadioGroup/Gender';
import { Tel } from '@/components/ui/Input/Tel';
import { PostalCode } from '@/components/ui/Input/PostalCode';
import { Prefecture } from '@/components/ui/Select/Prefecture';
import { City } from '@/components/ui/Select/City';
import { Town } from '@/components/ui/Input/Town';
import { Building } from '@/components/ui/Input/Building';
import { Email } from '@/components/ui/Input/Email';
import { Password } from '@/components/ui/Input/Password';
import { EmploymentStatus } from '@/components/ui/RadioGroup/EmploymentStatus';

export const BasicInfomationForm = () => {
  const {
    selectedYear,
    selectedMonth,
    selectedPrefecture,
    handleYearChange,
    handleMonthChange,
    handleDayChange,
    handleGenderChange,
    handlePrefectureChange,
    handlePostalCodeChange,
    handleEmailChange,
    handleEmploymentStatusChange,
  } = useBasicInformaionForm();

  return (
    <>
      <div className='flex flex-row gap-x-4'>
        <FamilyName />
        <FirstName />
      </div>

      <div className='flex flex-row gap-x-4'>
        <FamilyNameKana />
        <FirstNameKana />
      </div>

      <div>
        <Birthday
          handleYearChange={handleYearChange}
          handleMonthChange={handleMonthChange}
          handleDayChange={handleDayChange}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
      </div>

      <div>
        <Gender handleGenderChange={handleGenderChange} />
      </div>

      <div>
        <Tel />
      </div>

      <div>
        <PostalCode handlePostalCodeChange={handlePostalCodeChange} />
      </div>

      <div className='flex flex-row gap-x-4'>
        <Prefecture handlePrefectureChange={handlePrefectureChange} />
        <City selectedPrefecture={selectedPrefecture} />
      </div>

      <div>
        <Town />
      </div>

      <div>
        <Building />
      </div>

      <div>
        <Email handleEmailChange={handleEmailChange} />
      </div>

      <div>
        <Password />
      </div>

      <div>
        <EmploymentStatus handleEmploymentStatusChange={handleEmploymentStatusChange} />
      </div>
    </>
  );
};
