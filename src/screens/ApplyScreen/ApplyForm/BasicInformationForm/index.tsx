'use client';

import { FormField, FormMessage } from '@/components/ui/Form/form';
import { useBasicInformaionForm } from './useBasicInformationForm';
import { FamilyName } from '@/components/ui/Input/family-name';
import { FirstName } from '@/components/ui/Input/first-name';
import { FamilyNameKana } from '@/components/ui/Input/family-name-kana';
import { FirstNameKana } from '@/components/ui/Input/first-name-kana';
import { Birthday } from '@/components/shared/Parent/Birthday/birthday';
import { Gender } from '@/components/ui/RadioGroup/gender';
import { Tel } from '@/components/ui/Input/tel';
import { PostalCode } from '@/components/ui/Input/postal-code';
import { Prefecture } from '@/components/ui/Select/Prefecture/prefecture';
import { City } from '@/components/shared/Parent/City/city';
import { Town } from '@/components/ui/Input/town';
import { Building } from '@/components/ui/Input/building';
import { Email } from '@/components/ui/Input/email';
import { Password } from '@/components/ui/Input/password';
import { EmploymentStatus } from '@/components/ui/RadioGroup/employment-status';

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
