'use client'

import { useGetPostList } from './useGetPostList'

export const TanstackScreen = () => {
  const {data, error, isPending} = useGetPostList();

  console.log(`中身`);
  console.log(data);

  if (isPending) return(<>ローディング</>);
  if (error) return(<>エラーです</>);

  return (
    <>
      <div>
        データの取得結果
      </div>
      {
        data && (
          data?.map((el) => (
            <div key={el.id}>
              {el.title}
            </div>
          ))
        )
      }
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
  )
}
