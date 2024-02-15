'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Form } from '@/components/ui/Form/form';
import { ApplyFormSchemaType } from '../schemas';
import { BasicInfomationForm } from '@/screens/ApplyScreen/ApplyForm/BasicInformationForm';
import { ApplyInfomationForm } from '@/screens/ApplyScreen/ApplyForm/ApplyInfomationForm';
import { Button } from '@/components/ui/Button/button';

export const ApplyForm = () => {
  const forms = useForm<ApplyFormSchemaType>({
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
    <Form {...forms}>
      <form onSubmit={forms.handleSubmit(onSubmit)} className='space-y-8'>
        <BasicInfomationForm />
        {/* <ApplyInfomationForm /> */}
        <Button type='submit'>応募する</Button>
      </form>
    </Form>
  );
};
