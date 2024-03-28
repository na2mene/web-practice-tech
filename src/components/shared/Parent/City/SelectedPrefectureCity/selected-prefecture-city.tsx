'use client';

import { CityContent } from '@/components/shared/Parent/City/SelectedPrefectureCity/CityContent/city-content';
import { useGetCityListQuery } from './useGetCitiesQuery';
import { FC } from 'react';

//
// TODO: 外部APIの都合上、自動反映を後回し（watchしているのでリストは作成される）
//
type Props = {
  prefectureCode: string;
};

export const SelectedPrefectureCity: FC<Props> = ({ prefectureCode }) => {
  const { data: response } = useGetCityListQuery(String(prefectureCode).padStart(2, '0'));

  return <CityContent cityList={response?.data.data} />;
};
