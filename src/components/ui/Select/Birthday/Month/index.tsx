import { useMemo, FC } from 'react';
import { SelectContent, SelectItem } from '../../select';

type MonthProps = {
  startMonth?: number;
  isZeroPadding?: boolean;
};

export const Month: FC<MonthProps> = ({ startMonth = 1, isZeroPadding = false }) => {
  const items = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const month = ((index + startMonth - 1) % 12) + 1;
      const monthValue = isZeroPadding ? String(month).padStart(2, '0') : String(month);

      return (
        <SelectItem key={index} value={monthValue}>
          {monthValue}
        </SelectItem>
      );
    });
  }, [startMonth, isZeroPadding]);

  return <SelectContent>{items}</SelectContent>;
};
