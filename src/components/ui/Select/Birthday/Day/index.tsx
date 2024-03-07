import { useMemo, FC } from 'react';
import { SelectContent, SelectItem } from '../../select';
import { getDaysInMonth } from '@/utils/days';
import { BirthdaySchema } from '@/components/ui/Select/Birthday';

type DayProps = {
  year: BirthdaySchema['birthday']['year'];
  month: BirthdaySchema['birthday']['month'];
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
