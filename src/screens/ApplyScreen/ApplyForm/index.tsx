'use client';

import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
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
  let apiData = {
    qualificationData: [
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
    jobCategoryData: {
      id: 1,
      min_age: 0,
    },
  };
  if (id === '2') {
    apiData.qualificationData = [
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
    ];
    apiData.jobCategoryData.min_age = 23;
  }
  if (id === '3') {
    apiData.jobCategoryData.id = 39;
  }

  const applyFormSchema = createSchema(apiData);

  const forms = useForm<ApplyFormSchemaType>({
    defaultValues: {
      familyName: '',
      firstName: '',
      familyNameKana: '',
      firstNameKana: '',
      birthday: {
        year: '',
        month: '',
        day: '',
      },
      //
      // TODO: 初期値がない場合は、これでいいのか？
      //       これしかないと思っているので、明示的に設定
      gender: undefined,
      tel: '',
      postalCode: '',
      prefectureId: '',
      cityId: '',
      town: '',
      building: '',
      email: '',
      password: '',
      employmentStatus: undefined,
      memberCareer: '',
      memberQualifications: {
        qualifications: [],
        qualificationsAcquisitionScheduled: [],
      },
      preferredDatetime: [
        {
          preferredDate: '',
          preferredTime: [
            {
              hour: '',
              minutes: '00',
            },
          ],
        },
      ],
    },
    resolver: zodResolver(applyFormSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ApplyFormSchemaType> = (data) => {
    window.alert(`変換前: ${JSON.stringify(data)}`);

    data.postalCode = data.postalCode.replace(/-/g, '');
    data.tel = data.tel.replace(/-/g, '');

    window.alert(`変換後: ${JSON.stringify(data)}`);
  };

  const onError: SubmitErrorHandler<ApplyFormSchemaType> = (errors) => {
    //
    // NOTE: 職種のIDが、配列に含まれていない かつ
    //       errorsの要素が1件 かつ
    //       errors.memberQualifications が 何かしらのエラーに引っ掛かっている(= 何かエラーとなっている)
    //       => このときは、memberQualificationsがエラーであってもデータを送信する.（既存仕様踏襲）
    //
    if (
      ![39].includes(apiData.jobCategoryData.id) &&
      Object.keys(errors).length === 1 &&
      typeof errors.memberQualifications !== 'undefined'
    ) {
      onSubmit(forms.getValues());
    }
  };

  console.log(forms.formState.errors);

  return (
    <Form {...forms}>
      <form onSubmit={forms.handleSubmit(onSubmit, onError)} className='space-y-8'>
        <BasicInfomationForm />
        <ApplyInfomationForm qualifications={apiData.qualificationData} />
        <Button type='submit'>応募する</Button>
      </form>
    </Form>
  );
};
