import { useFormContext } from 'react-hook-form';
import { ApplyInformationSchemaType } from '../../schemas';

export const useApplyInformationForm = () => {
  const { setValue, trigger, getValues } = useFormContext<ApplyInformationSchemaType>();

  const handleQualificationChange = (
    checked: boolean,
    value: number[],
    qualification_id: number,
  ) => {
    if (checked) {
      setValue('qualifications', [...value, qualification_id]);
    } else {
      setValue(
        'qualifications',
        value?.filter((value) => value !== qualification_id),
      );
    }
    trigger('qualifications');
  };

  const handlePreferredDatetimeChange = (value: string) => {
    // 2024年03月13日(水)
  };

  return {
    getValues,

    handleQualificationChange,
    handlePreferredDatetimeChange,
  };
};
