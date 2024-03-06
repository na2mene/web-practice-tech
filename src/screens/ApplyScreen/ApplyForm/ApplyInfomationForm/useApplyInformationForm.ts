import { useFormContext } from 'react-hook-form';
import { ApplyInformationSchemaType } from '../../schemas';

export const useApplyInformationForm = () => {
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<ApplyInformationSchemaType>();

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

  return {
    control,
    errors,

    handleQualificationChange,
  };
};
