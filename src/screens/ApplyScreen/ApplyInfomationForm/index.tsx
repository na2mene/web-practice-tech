import { useFormContext } from 'react-hook-form';
import { ApplyInformationFormSchemaType } from '../schemas';

export const ApplyInfomationForm = () => {
  const { register } = useFormContext<ApplyInformationFormSchemaType>();

  return (
    <>
      <div>
        <select {...register('MemberCareer')}>
          <option value=''>未設定</option>
          <option value='0'>未経験</option>
          <option value='1'>1年未満</option>
          <option value='2'>2年未満</option>
        </select>
      </div>
    </>
  );
};
