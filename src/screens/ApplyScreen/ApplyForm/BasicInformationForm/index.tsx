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
import { Select, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/Select/select';
import { Year } from '@/components/ui/Select/Birthday/year';
import { Month } from '@/components/ui/Select/Birthday/month';
import { Day } from '@/components/ui/Select/Birthday/day';
import { Prefecture } from '@/components/ui/Select/Prefecture';
import { CityWrapper } from '@/screens/ApplyScreen/ApplyForm/BasicInformationForm/CityWrapper';
import { useBasicInformaionForm } from '@/screens/ApplyScreen/ApplyForm/BasicInformationForm/useBasicInformationForm';

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
    handlePostalCodeChange,
    handleEmailChange,
  } = useBasicInformaionForm();
  return (
    <>
      <div className='flex flex-row gap-x-4'>
        <FormField
          control={control}
          name='familyName'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>名字</FormLabel>
              <FormControl>
                <Input placeholder='山田' {...field} />
              </FormControl>
              <FormDescription>ここは説明箇所です.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='firstName'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input placeholder='太郎' {...field} />
              </FormControl>
              <FormDescription>ここは説明箇所です.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='flex flex-row gap-x-4'>
        <FormField
          control={control}
          name='familyNameKana'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>名字かな</FormLabel>
              <FormControl>
                <Input placeholder='やまだ' {...field} />
              </FormControl>
              <FormDescription>ここは説明箇所です.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='firstNameKana'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>名前かな</FormLabel>
              <FormControl>
                <Input placeholder='たろう' {...field} />
              </FormControl>
              <FormDescription>ここは説明箇所です.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <div className='flex flex-row gap-x-4'>
          <FormField
            control={control}
            name='birthday.year'
            render={({ field: { ref, onChange, ...restField } }) => (
              <Select {...restField} onValueChange={handleYearChange}>
                <SelectTrigger ref={ref} className='w-[180px]'>
                  <SelectValue placeholder='西暦' />
                </SelectTrigger>
                <Year />
              </Select>
            )}
          />

          <FormField
            control={control}
            name='birthday.month'
            render={({ field: { ref, onChange, ...restField } }) => (
              <Select {...restField} onValueChange={(value) => handleMonthChange(value)}>
                <SelectTrigger ref={ref} className='w-[180px]'>
                  <SelectValue placeholder='月' />
                </SelectTrigger>
                <Month />
              </Select>
            )}
          />

          <FormField
            control={control}
            name='birthday.day'
            //
            // NOTE: shadcnuiが作るSelectは、onValueChangeのPropsで待っているので、onChange単体を取り出して、
            //       関数をそのまま渡してあげている
            render={({ field: { ref, onChange, ...restField } }) => {
              return (
                <Select {...restField} onValueChange={(value) => handleDayChange(value)}>
                  <SelectTrigger ref={ref} className='w-[180px]'>
                    {/*
                    // NOTE: 本来、shadcnの仕様的に、placeholderが出力するには、
                    //       Selectのvalueが、undefinedであることなのだが、
                    //       空文字となる場合に表示される（バグっぽい）
                  */}
                    <SelectValue placeholder='日' />
                  </SelectTrigger>
                  <Day year={selectedYear} month={selectedMonth} />
                </Select>
              );
            }}
          />
        </div>

        {errors.birthday?.year?.message ? (
          <FormField name='birthday.year' render={() => <FormMessage />} />
        ) : errors.birthday?.month?.message ? (
          <FormField name='birthday.month' render={() => <FormMessage />} />
        ) : errors.birthday?.day?.message ? (
          <FormField name='birthday.day' render={() => <FormMessage />} />
        ) : (
          // @ts-ignore
          errors.birthday?.ageIneligible?.message && (
            <FormField name='birthday.ageIneligible' render={() => <FormMessage />} />
          )
        )}
      </div>

      <div>
        <FormField
          control={control}
          name='gender'
          render={({ field: { value, onChange, ...restField } }) => (
            <FormItem className='space-y-3'>
              <FormLabel>性別</FormLabel>
              <FormControl>
                <RadioGroup
                  {...restField}
                  aria-label='性別'
                  className='flex items-center space-x-2'
                  defaultValue={`${value}`}
                  onValueChange={onChange}
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='female' id='female' />
                    </FormControl>
                    <FormLabel className='font-normal' htmlFor='female'>
                      女性
                    </FormLabel>
                  </FormItem>

                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='male' id='male' />
                    </FormControl>
                    <FormLabel className='font-normal' htmlFor='male'>
                      男性
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={control}
          name='tel'
          render={({ field }) => (
            <FormItem>
              <FormLabel>電話番号</FormLabel>
              <FormControl>
                <Input className='w-[180px]' placeholder='09012345678' {...field} />
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
          name='postalCode'
          render={({ field: { onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>郵便番号</FormLabel>
              <FormControl>
                <Input
                  className='w-[180px]'
                  placeholder='2610011'
                  {...restField}
                  onChange={(event) => handlePostalCodeChange(event.target.value)}
                />
              </FormControl>
              <FormDescription>ここは説明箇所です.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='flex flex-row gap-x-4'>
        <FormField
          control={control}
          name='prefectureId'
          render={({ field: { ref, onChange, ...restField } }) => (
            <Select {...restField} onValueChange={onChange}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='都道府県' />
              </SelectTrigger>
              <Prefecture />
              <FormMessage />
            </Select>
          )}
        />

        <FormField
          name='cityId'
          control={control}
          render={({ field: { ref, onChange, ...restField } }) => {
            return (
              <Select {...restField} onValueChange={onChange}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='市区町村' />
                </SelectTrigger>
                {selectedPrefecture ? (
                  //
                  // TODO: 外部APIの都合上、自動反映を後回し（watchしているのでリストは作成される）
                  //
                  <CityWrapper prefectureCode={selectedPrefecture} />
                ) : (
                  <SelectContent />
                )}
                <FormMessage />
              </Select>
            );
          }}
        />
      </div>

      <div>
        <FormField
          control={control}
          name='town'
          render={({ field }) => (
            <FormItem className='w-[380px]'>
              <FormControl>
                <Input placeholder='町名・番地' {...field} />
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
          name='building'
          render={({ field }) => (
            <FormItem className='w-[380px]'>
              <FormControl>
                <Input placeholder='建物名' {...field} />
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
          name='email'
          render={({ field: { onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input
                  placeholder='メールアドレス'
                  {...restField}
                  //
                  // TODO: カスタムバリデーションを任意のタイミングで実行する方法を模索したい
                  //
                  onChange={(event) => handleEmailChange(event.target.value)}
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
