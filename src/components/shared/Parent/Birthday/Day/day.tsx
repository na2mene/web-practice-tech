import { useMemo, FC } from 'react';
import { SelectContent, SelectItem } from '../../../../ui/Select/select';
import { getDaysInMonth } from '@/utils/days';
import { BirthdaySchemaType } from '@/components/shared/Parent/Birthday/birthday';

type Props = {
  year: BirthdaySchemaType['birthday']['year'];
  month: BirthdaySchemaType['birthday']['month'];
  isZeroPadding?: boolean;
};

export const Day: FC<Props> = ({ year, month, isZeroPadding = false }: Props) => {
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
