import { useMemo, FC } from 'react';
import { SelectContent, SelectItem } from '../select';

type YearProps = {
  startYear: number;
  endYear: number;
};

export const Year: FC<YearProps> = ({ startYear, endYear }) => {
  const range = startYear - endYear + 1;
  const items = useMemo(
    () =>
      Array.from({ length: range }, (_, index) => (
        <SelectItem key={index} value={String(startYear - index)}>
          {startYear - index}
        </SelectItem>
      )),
    [range, startYear],
  );

  return <SelectContent>{items}</SelectContent>;
};
