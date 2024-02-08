'use client';

import { useGetPostList } from './useGetPostList';

export const TanstackScreen = () => {
  const { data: response, error, isPending } = useGetPostList();
  console.log(`中身`);
  console.log(response?.data);

  if (isPending) return <>ローディング</>;
  if (error) return <>エラーです</>;
  if (response.status == 404) return <>404</>;

  return (
    <>
      <div>データの取得結果</div>
      {response.data && response.data?.map((el) => <div key={el.id}>{el.title}</div>)}
      {/* <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          })
        }}
      >
        Add Todo
      </button> */}
    </>
  );
};
