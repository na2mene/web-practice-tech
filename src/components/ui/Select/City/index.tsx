import { useMemo, FC } from 'react';
import { SelectContent, SelectItem } from '../select';
import { GetCityListResponseBodyDataInner } from '@/__generated_REST__/api.schemas';

type CityProps = {
  cityList?: GetCityListResponseBodyDataInner[];
};

export const City: FC<CityProps> = ({ cityList }) => {
  const items = useMemo(() => {
    // TODO: forEachの方がいいと思っている（副作用）
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
