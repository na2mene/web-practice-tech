'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/Form/form';
import { applyFormSchema, ApplyFormSchemaType } from '../schemas';
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
      postalCode: '',
      password: '',
      city: '',
      gender: '',
      employmentStatus: '',
      // TODO: undefinedを初期値とすると、Requiredのエラーがうまく出現するが、空文字だとRequiredの判定をスルーしてしまう
      //       Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components
      // MemberCareer: undefined,
      MemberCareer: '',
      qualification: '',
    },
    resolver: zodResolver(applyFormSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ApplyFormSchemaType> = (data) => {
    console.log(data);
  };

  // console.log(forms.formState.errors);

  return (
    <Form {...forms}>
      <form onSubmit={forms.handleSubmit(onSubmit)} className='space-y-8'>
        <BasicInfomationForm />
        <ApplyInfomationForm />
        <Button type='submit'>応募する</Button>
      </form>
    </Form>
  );
};
