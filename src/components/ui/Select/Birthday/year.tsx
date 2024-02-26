import { useMemo, FC } from 'react';
import { SelectContent, SelectItem } from '../select';

export const Year: FC = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 17;
  const endYear = 1900;

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
