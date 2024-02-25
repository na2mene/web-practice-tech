import { SelectContent, SelectItem } from '@/components/ui/Select/select';
import { useMemo, FC } from 'react';

const careers = [
  { id: 0, name: '未経験' },
  { id: 1, name: '1年未満' },
  { id: 2, name: '2年未満' },
  { id: 3, name: '3年未満' },
  { id: 4, name: '4年未満' },
  { id: 5, name: '5年未満' },
  { id: 6, name: '6年未満' },
  { id: 7, name: '7年未満' },
  { id: 8, name: '8年未満' },
  { id: 9, name: '9年未満' },
  { id: 10, name: '10年未満' },
  { id: 11, name: '10年以上' },
];

export const MemberCareer: FC = () => {
  // TODO: なんでエラーなのかわかってない
  // const items = useMemo(() => {
  //   careers.map((career, index) => {
  //     return (
  //       <SelectItem key={index} value={String(career.id)}>
  //         {career.name}
  //       </SelectItem>
  //     )
  //   }, []);

  const items = useMemo(() => {
    return Array.from({ length: careers.length }, (_, index) => {
      return (
        <SelectItem key={index + 1} value={String(careers[index].id)}>
          {careers[index].name}
        </SelectItem>
      );
    });
  }, []);

  return <SelectContent>{items}</SelectContent>;
};
