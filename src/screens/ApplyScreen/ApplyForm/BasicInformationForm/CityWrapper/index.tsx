'use client';

import { City } from '@/components/ui/Select/City';
import { useGetCityListQuery } from '@/components/ui/Select/City/useGetCitiesQuery';
import { FC } from 'react';

//
// TODO: 外部APIの都合上、自動反映を後回し（watchしているのでリストは作成される）
//
type CityWrapperProps = {
  prefectureCode: string;
};

export const CityWrapper: FC<CityWrapperProps> = ({ prefectureCode }) => {
  const { data: response } = useGetCityListQuery(String(prefectureCode).padStart(2, '0'));

  return <City cityList={response?.data.data} />;
};
