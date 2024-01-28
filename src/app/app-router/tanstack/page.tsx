'use client'

import { useGetPosts } from '@/api/posts/posts'

// NOTE: Axiosをかました時にレスポンスの返却値が変わるので、同じようにwrapしたい
// import { getGetPostsMock } from '@/api/backend.msw'

export default function Page() {
  // TODO: dev環境特有？2回目のレンダリングの時に、エラーで死ぬ
  //       隙間で調査、動くには動いてそうだけど、使えてないのが現実.
  // const res = getGetPostsMock();

  const { data: res, error, isPending } = useGetPosts();
  if (isPending) return (<div>ローディング</div>);
  if (error) return (<div>エラーです: {error}</div>);

  console.log(`中身`);
  console.log(res);

  return (
    <>
      {
        res.data.map((el) => (
          <div key={el.id}>
            {el.title}
          </div>
        ))
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
