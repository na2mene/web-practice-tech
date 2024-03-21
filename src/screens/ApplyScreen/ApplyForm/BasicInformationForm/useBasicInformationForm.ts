import { useFormContext } from 'react-hook-form';
import { BasicInformationSchemaType } from '../../schemas';
import { getDaysInMonth } from '@/utils/days';
import { getZipcodeOrList } from '@/__generated_REST__/zipcloud/zipcloud';

export const useBasicInformaionForm = () => {
  const { watch, setValue, trigger } = useFormContext<BasicInformationSchemaType>();

  const selectedYear = watch('birthday.year');
  const selectedMonth = watch('birthday.month');
  const selectedDay = watch('birthday.day');

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
      setValue('birthday.day', '');
    }
    setValue('birthday.year', value);
    trigger('birthday');
  };

  //
  // NOTE: 選択された月をフォームの 'month' フィールドに設定する
  //       年月日の状態によって、日を空にするため、onChange時に拡張している
  //
  const handleMonthChange = (value: string) => {
    // 現在選択されている `日` が、選択されたYear, Monthでの日に存在しない場合
    if (getDaysInMonth(selectedYear, value) < Number(selectedDay)) {
      setValue('birthday.day', '');
    }
    setValue('birthday.month', value);
    trigger('birthday');
  };

  //
  // NOTE: 一見、必要になさそうに見えるが、birthdayのrefineを即時実行させるために、必要
  //       birthday単位に対して、triggerをかけるとうまくいくので、
  //       そのような意図で、handlerを定義している.
  //
  const handleDayChange = (value: string) => {
    setValue('birthday.day', value);
    trigger('birthday');
  };

  //
  // NOTE: RHFのmode: onBlurだと、ラジオボタンは反応しない（選択後、他の場所をクリックしないと反応しない）
  //       ので、ラジオボタンだけは、onChangeな動きで反応させるために、handlerを切る
  //
  const handleGenderChange = (value: string) => {
    if (value === 'male' || value === 'female') {
      setValue('gender', value);
    } else {
      console.error('male | female以外の値が設定されようとしています。');
    }
    trigger('gender');
  };

  const handlePrefectureChange = (value: string) => {
    //
    // NOTE: ハンドラーを設定した場合は、この2つは必須と考えていい.
    //       ハンドラーを定義するとRHFのonChangeをオーバーライドしているのと同じなので、
    //       useFormで指定しているonBlurなどが効いてないみたいな感じとなる.
    //       ゆえに、setValueとtriggerは必須となる.
    //
    setValue('prefectureId', value);
    trigger('prefectureId');

    //
    // NOTE: 明示的に空を設定しないと、shadcn/uiのSelectValueが表示されないため
    //       このハンドラーが必要となる
    //
    setValue('cityId', '');
  };

  const handlePostalCodeChange = async (value: string) => {
    setValue('postalCode', value);
    trigger('postalCode');

    //
    // NOTE: ハイフンを許容したUIのため、Stateを変更せず、
    //       ロジックで対応する
    //
    const sanitizedPostalCode = value.replace(/-/g, '');

    if (sanitizedPostalCode.length === 7) {
      //
      // TODO: 本来、refineで定義する様な内容とフォームへ反映するという2つの機能が包括されている
      //       入力された郵便番号が正しいかのチェックとそれを踏まえて都道府県、市区町村、町名・番地への反映
      //       このユースケースの場合、結局、onChangeの中で全部やるしかない気がしたので、こっちに寄せた.
      //
      //       ここもTanstack経由のメリットがないので、axiosで呼ぶでOK
      const zipcodeData = await getZipcodeOrList(
        { zipcode: sanitizedPostalCode },
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

        trigger('prefectureId');
        // trigger('cityId');
        trigger('town');
      }
    }
  };

  const handleEmailChange = (value: string) => {
    setValue('email', value);
    trigger('email');
  };

  //
  // NOTE: RHFのmode: onBlurだと、ラジオボタンは反応しない（選択後、他の場所をクリックしないと反応しない）
  //       ので、ラジオボタンだけは、onChangeな動きで反応させるために、handlerを切る
  //
  const handleEmploymentStatusChange = (value: string) => {
    if (value === '1' || value === '2' || value === '3') {
      setValue('employmentStatus', value);
    } else {
      console.error('1 | 2 | 3 以外の値が設定されようとしています。');
    }
    trigger('employmentStatus');
  };

  return {
    selectedYear,
    selectedMonth,
    selectedPrefecture,

    handleYearChange,
    handleMonthChange,
    handleDayChange,
    handleGenderChange,
    handlePrefectureChange,
    handlePostalCodeChange,
    handleEmailChange,
    handleEmploymentStatusChange,
  };
};
