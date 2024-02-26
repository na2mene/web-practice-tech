import { useFormContext } from 'react-hook-form';
import { BasicInformationSchemaType } from '../../schemas';
import { getDaysInMonth } from '@/utils/days';
import { getZipcodeOrList } from '@/__generated_REST__/zipcloud/zipcloud';

export const useBasicInformaionForm = () => {
  const { control, watch, setValue, trigger } = useFormContext<BasicInformationSchemaType>();

  const selectedYear = watch('year');
  const selectedMonth = watch('month');
  const selectedDay = watch('day');

  const selectedPrefecture = watch('prefectureId');
  //
  // TODO: 外部APIの都合上、自動反映を後回し（watchしているのでリストは作成される）
  //
  // const selectedCity = watch('cityId');

  //
  // NOTE: 選択された年をフォームの 'year' フィールドに設定する
  //       年月日の状態によって、日を空にするため、onChange時に拡張している
  //
  const handleYearChange = (value: string) => {
    // 現在選択されている `日` が、選択されたYear, Monthでの日に存在しない場合
    if (getDaysInMonth(value, selectedMonth) < Number(selectedDay)) {
      setValue('day', '');
    }
    setValue('year', value);

    //
    // TODO: birthdayというキーでエラーを管理しているので、
    //       生年月日のonChangeで毎回手動でバリデーションチェックする
    //       refineのpathがbirthdayなので、こういう書き方しかできないかもしれない
    //
    // @ts-ignore
    trigger('birthday');
  };

  //
  // NOTE: 選択された月をフォームの 'month' フィールドに設定する
  //       年月日の状態によって、日を空にするため、onChange時に拡張している
  //
  const handleMonthChange = (value: string) => {
    // 現在選択されている `日` が、選択されたYear, Monthでの日に存在しない場合
    if (getDaysInMonth(selectedYear, value) < Number(selectedDay)) {
      setValue('day', '');
    }
    setValue('month', value);

    //
    // TODO: birthdayというキーでエラーを管理しているので、
    //       生年月日のonChangeで毎回手動でバリデーションチェックする
    //       refineのpathがbirthdayなので、こういう書き方しかできないかもしれない
    //
    // @ts-ignore
    trigger('birthday');
  };

  const handleDayChange = (value: string) => {
    setValue('day', value);
    //
    // TODO: birthdayというキーでエラーを管理しているので、
    //       生年月日のonChangeで毎回手動でバリデーションチェックする
    //       refineのpathがbirthdayなので、こういう書き方しかできないかもしれない
    //
    // @ts-ignore
    trigger('birthday');
  };

  const handlePostalCodeChange = async (value: string) => {
    setValue('postalCode', value);

    if (value.length === 7) {
      //
      // TODO: refineで定義する必要があるか問題
      //       onChange側でAPI呼ぶなら、同じことするだけなので無駄な気もする
      //       そもそもonChange時にAPI通信した結果の反映がこのやり方で
      //       正しい場合、refineの定義どうするかを考える
      //
      trigger('postalCode');
      const zipcodeData = await getZipcodeOrList(
        { zipcode: value },
        { baseURL: 'https://zipcloud.ibsnet.co.jp' },
      );
      const {
        status,
        data: { results: data },
      } = zipcodeData;
      if (status === 200 && data !== null) {
        setValue('prefectureId', data[0].prefcode);
        setValue('town', data[0].address3);
        //
        // TODO: 外部APIの都合上、自動反映を後回し（watchしているのでリストは作成される）
        //
        // setValue('cityId', cityId);
      }
    }
  };

  //
  // TODO: カスタムバリデーションを任意のタイミングで実行する方法を模索したい
  //
  const handleEmailChange = (value: string) => {
    setValue('email', value);
    trigger('email');
  };

  return {
    control,

    selectedYear,
    selectedMonth,
    selectedPrefecture,

    handleYearChange,
    handleMonthChange,
    handleDayChange,
    handlePostalCodeChange,
    handleEmailChange,
  };
};
