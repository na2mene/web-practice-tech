import { SelectContent, SelectItem } from '@/components/ui/Select/select';
import { useMemo, FC } from 'react';

const HOURS = [
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
];

export const PreferredHourContent: FC = () => {
  const items = useMemo(() => {
    return HOURS.map((hour, index) => {
      return (
        <SelectItem key={index + 1} value={String(hour.value)}>
          {hour.label}
        </SelectItem>
      );
    });
  }, []);

  return <SelectContent>{items}</SelectContent>;
};
