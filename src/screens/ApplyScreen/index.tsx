'use client';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { BasicInfomationForm } from './BasicInformationForm';
import { ApplyInfomationForm } from './ApplyInfomationForm';
import { ApplyFormSchemaType } from './schemas';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const ApplyScreen = ({ params, searchParams }: Props) => {
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
      <h1>応募フォームです</h1>
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
