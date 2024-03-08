import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/Form/form';
import { Input } from '@/components/ui/Input/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup/radio-group';
import { useBasicInformaionForm } from '@/screens/ApplyScreen/ApplyForm/BasicInformationForm/useBasicInformationForm';
import { FamilyName } from '@/components/ui/Input/FamilyName';
import { FamilyNameKana } from '@/components/ui/Input/FamilyNameKana';
import { FirstName } from '@/components/ui/Input/FirstName';
import { FirstNameKana } from '@/components/ui/Input/FirstNameKana';
import { Birthday } from '@/components/ui/Select/Birthday';
import { Gender } from '@/components/ui/RadioGroup/Gender';
import { Tel } from '@/components/ui/Input/Tel';
import { PostalCode } from '@/components/ui/Input/PostalCode';
import { Prefecture } from '@/components/ui/Select/Prefecture';
import { City } from '@/components/ui/Select/City';
import { Town } from '@/components/ui/Input/Town';
import { Building } from '@/components/ui/Input/Building';

export const BasicInfomationForm = () => {
  const {
    control,
    errors,
    selectedYear,
    selectedMonth,
    selectedPrefecture,
    handleYearChange,
    handleMonthChange,
    handleDayChange,
    handlePrefectureChange,
    handlePostalCodeChange,
    handleEmailChange,
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
        <div className='flex flex-row gap-x-4'>
          <Birthday
            handleYearChange={handleYearChange}
            handleMonthChange={handleMonthChange}
            handleDayChange={handleDayChange}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
        </div>

        {errors.birthday?.year?.message ? (
          <FormField name='birthday.year' render={() => <FormMessage />} />
        ) : errors.birthday?.month?.message ? (
          <FormField name='birthday.month' render={() => <FormMessage />} />
        ) : errors.birthday?.day?.message ? (
          <FormField name='birthday.day' render={() => <FormMessage />} />
        ) : (
          errors.birthday?.message && <FormField name='birthday' render={() => <FormMessage />} />
        )}
      </div>

      <div>
        <Gender />
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
        <FormField
          control={control}
          name='email'
          render={({ field: { onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input
                  placeholder='メールアドレス'
                  {...restField}
                  onChange={(event) => {
                    handleEmailChange(event.target.value);
                  }}
                />
              </FormControl>
              <FormDescription>ここは説明箇所です.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input type='password' placeholder='パスワード' {...field} />
              </FormControl>
              <FormDescription>ここは説明箇所です.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={control}
          name='employmentStatus'
          render={({ field: { value, onChange, ...restField } }) => (
            <FormItem className='space-y-3'>
              <FormLabel>就業状況</FormLabel>
              <FormControl>
                <RadioGroup
                  {...restField}
                  aria-label='就業状況'
                  className='flex items-center space-x-2'
                  onValueChange={onChange}
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='1' id='on' />
                    </FormControl>
                    <FormLabel className='font-normal' htmlFor='on'>
                      就業中
                    </FormLabel>
                  </FormItem>

                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='2' id='off' />
                    </FormControl>
                    <FormLabel className='font-normal' htmlFor='off'>
                      離職中
                    </FormLabel>
                  </FormItem>

                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='3' id='student' />
                    </FormControl>
                    <FormLabel className='font-normal' htmlFor='student'>
                      在学中
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
