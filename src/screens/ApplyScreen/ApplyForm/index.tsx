'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ApplyFormSchemaType } from '../schemas';
import { Form } from '@/components/ui/Form/form';
import { createSchema } from '../schemas';
import { BasicInfomationForm } from '@/screens/ApplyScreen/ApplyForm/BasicInformationForm';
import { ApplyInfomationForm } from '@/screens/ApplyScreen/ApplyForm/ApplyInfomationForm';
import { Button } from '@/components/ui/Button/button';

type Props = {
  id: string;
};

export const ApplyForm = ({ id }: Props) => {
  // const { data } = useQuarificationQuery();
  const data: {
    ans: {
      id: number;
      name: string;
      required: boolean;
    }[];
    apo: {
      id: number;
      name: string;
      required: boolean;
    }[];
  } = {
    ans: [
      {
        id: 1,
        name: '看護師',
        required: true,
      },
      {
        id: 2,
        name: '准看護師',
        required: true,
      },
      {
        id: 3,
        name: '自動車運転免許',
        required: false,
      },
    ],
    apo: [
      {
        id: 4,
        name: '薬剤師',
        required: true,
      },
      {
        id: 3,
        name: '自動車運転免許',
        required: false,
      },
    ],
  };

  type JobCategoryCode = 'ans' | 'apo';
  let key: JobCategoryCode = 'ans';

  if (id === '2') {
    key = 'apo';
  }

  const applyFormSchema = createSchema(data[key]);

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
      // day: '',
      // tel: '',
      // town: '',
      // building: '',
      // email: '',
      // postalCode: '',
      // password: '',
      // cityId: '',
      // gender: undefined,
      // employmentStatus: 0,
      // TODO: undefinedを初期値とすると、Requiredのエラーがうまく出現するが、空文字だとRequiredの判定をスルーしてしまう
      //       Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components
      // MemberCareer: undefined,
      // qualifications: [],
    },
    resolver: zodResolver(applyFormSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ApplyFormSchemaType> = (data) => {
    console.log(data);
  };

  console.log(forms.formState.errors);

  return (
    <Form {...forms}>
      <form onSubmit={forms.handleSubmit(onSubmit)} className='space-y-8'>
        <BasicInfomationForm />
        {/* <ApplyInfomationForm qualifications={data[key]} /> */}
        <Button type='submit'>応募する</Button>
      </form>
    </Form>
  );
};
