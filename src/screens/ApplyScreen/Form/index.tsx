'use client';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { ApplyFormSchemaType } from '../schemas';
import { BasicInfomationForm } from '@/screens/ApplyScreen/Form/BasicInformationForm';
import { ApplyInfomationForm } from '@/screens/ApplyScreen/Form/ApplyInfomationForm';

export const Form = () => {
  const Forms = useForm<ApplyFormSchemaType>({
    // NOTE: 以下回避のため、デフォルト値を設定する
    // @see: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
    defaultValues: {
      familyName: '',
      firstName: '',
      familyNameKana: '',
      firstNameKana: '',
      // NOTE: RadixUI側のbugっぽく、回避策が、空文字をdefaultValuesに使うようなことが書いてあった
      // @see: https://github.com/radix-ui/primitives/issues/1808
      day: '',
      tel: '',
      town: '',
      building: '',
      email: '',
      password: '',
      city: '',
      gender: '',
      employmentStatus: '',
    },
  });
  const onSubmit: SubmitHandler<ApplyFormSchemaType> = (data) => console.log(data);
  return (
    <>
      <FormProvider {...Forms}>
        <form onSubmit={Forms.handleSubmit(onSubmit)}>
          <BasicInfomationForm />
          {/* <ApplyInfomationForm /> */}
          <button type='submit'>応募する</button>
        </form>
      </FormProvider>
    </>
  );
};
