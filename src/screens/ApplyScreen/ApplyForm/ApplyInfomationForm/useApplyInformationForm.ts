import { useFormContext } from 'react-hook-form';
import { ApplyInformationSchemaType } from '../../schemas';

export const useApplyInformationForm = () => {
  const { setValue, trigger } = useFormContext<ApplyInformationSchemaType>();

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

  const handlePreferredDateChange = (value: string, preferredDateIndex: number) => {
    setValue(`preferredDatetime.${preferredDateIndex}.preferredDate`, value);
    trigger('preferredDatetime');
  };

  const handlePreferredTimeHourChange = (
    value: string,
    preferredDateIndex: number,
    preferredTimeIndex: number,
  ) => {
    setValue(
      `preferredDatetime.${preferredDateIndex}.preferredTime.${preferredTimeIndex}.hour`,
      value,
    );
    trigger('preferredDatetime');
  };

  const handlePreferredTimeMinuteChange = (
    value: string,
    preferredDateIndex: number,
    preferredTimeIndex: number,
  ) => {
    setValue(
      `preferredDatetime.${preferredDateIndex}.preferredTime.${preferredTimeIndex}.minute`,
      value,
    );
    trigger('preferredDatetime');
  };

  return {
    handleQualificationChange,
    handlePreferredDateChange,
    handlePreferredTimeHourChange,
    handlePreferredTimeMinuteChange,
  };
};
