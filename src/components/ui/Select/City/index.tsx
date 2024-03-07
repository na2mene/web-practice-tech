import { useMemo, FC } from 'react';
import { SelectContent, SelectItem } from '../select';
import { GetCityListResponseBodyDataInner } from '@/__generated_REST__/api.schemas';

//
// TODO: 外部APIの都合上、自動反映を後回し（watchしているのでリストは作成される）
//
type Props = {
  cityList?: GetCityListResponseBodyDataInner[];
};

export const City: FC<Props> = ({ cityList }: Props) => {
  const items = useMemo(() => {
    return cityList?.map((element, index) => {
      return (
        <SelectItem key={index + 1} value={element.id}>
          {element.name}
        </SelectItem>
      );
    });
  }, [cityList]);

  return <SelectContent>{items}</SelectContent>;
};
