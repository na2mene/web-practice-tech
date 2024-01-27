'use client'

import {
  useQuery,
} from '@tanstack/react-query'

const getPosts = () => {
  return fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
};

export default function Page() {
  const { isPending, data } = useQuery({ queryKey: ['todos'], queryFn: getPosts })
  if (isPending) return (<div>ローディング</div>);

  console.log(data);

  return (
    <>
      {
        data.map((el) => (
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
