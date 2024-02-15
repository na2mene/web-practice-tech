'use client';

import { City } from '@/components/ui/Select/City';
import { useGetCityListQuery } from '@/components/ui/Select/City/useGetCitiesQuery';
import { FC } from 'react';

type CityWrapperProps = {
  prefectureCode: string;
};

export const CityWrapper: FC<CityWrapperProps> = ({ prefectureCode }) => {
  const { data: response } = useGetCityListQuery(String(prefectureCode).padStart(2, '0'));

  return <City cityList={response?.data.data} />;
};
