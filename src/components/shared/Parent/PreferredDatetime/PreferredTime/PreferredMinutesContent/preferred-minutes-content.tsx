import { SelectContent, SelectItem } from '@/components/ui/Select/select';
import { useMemo, FC } from 'react';

const MINUTES = [
  { value: '00', label: '00' },
  { value: '15', label: '15' },
  { value: '30', label: '30' },
  { value: '45', label: '45' },
];

export const PreferredMinuteContent: FC = () => {
  const items = useMemo(() => {
    return MINUTES.map((minutes, index) => {
      return (
        <SelectItem key={index + 1} value={String(minutes.value)}>
          {minutes.label}
        </SelectItem>
      );
    });
  }, []);

  return <SelectContent>{items}</SelectContent>;
};
