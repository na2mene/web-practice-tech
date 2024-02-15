import { useMemo, FC } from 'react';
import { SelectContent, SelectItem } from '../select';
import { BasicInformationFormSchemaType } from '@/screens/ApplyScreen/schemas';
import { getDaysInMonth } from '@/utils/days';

type DayProps = {
  year: BasicInformationFormSchemaType['year'];
  month: BasicInformationFormSchemaType['month'];
  isZeroPadding?: boolean;
};

export const Day: FC<DayProps> = ({ year, month, isZeroPadding = false }) => {
  const daysInMonth = getDaysInMonth(year, month);

  const items = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const dayValue = isZeroPadding ? String(day).padStart(2, '0') : String(day);
      return (
        <SelectItem key={index} value={dayValue}>
          {dayValue}
        </SelectItem>
      );
    });
  }, [isZeroPadding, daysInMonth]);

  return <SelectContent>{items}</SelectContent>;
};
