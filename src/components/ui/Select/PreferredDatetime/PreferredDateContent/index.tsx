import { SelectContent, SelectItem } from '@/components/ui/Select/select';
import { useMemo, FC } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
dayjs.locale('ja');

export const PreferredDateContent: FC = () => {
  const today = dayjs();
  const oneMonthLater = today.add(1, 'month');
  const preferredDateList = Array.from(
    { length: oneMonthLater.diff(today, 'day') + 1 },
    (_, index) => {
      const date = today.add(index, 'day');
      return {
        value: date.format('YYYY年MM月DD日(dd)'),
        label: date.format('YYYY年MM月DD日(dd)'),
      };
    },
  );

  const items = useMemo(() => {
    return preferredDateList.map((preferredDate, index) => {
      return (
        <SelectItem key={index + 1} value={preferredDate.value}>
          {preferredDate.label}
        </SelectItem>
      );
    });
  }, [preferredDateList]);

  return <SelectContent>{items}</SelectContent>;
};
