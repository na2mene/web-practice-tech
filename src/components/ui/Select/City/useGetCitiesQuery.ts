import { useGetCityList } from '@/__generated_REST__/webland/webland';

const useGetCityListQuery = (prefectureCode: string) => {
  return useGetCityList(
    { area: prefectureCode },
    {
      axios: {
        baseURL: 'https://www.land.mlit.go.jp',
      },
    },
  );
};

export { useGetCityListQuery };
