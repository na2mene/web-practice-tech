import type { GetPostsResponseBody } from '@/__generated_REST__/api.schemas';
import { useGetPosts, GetPostsQueryResult } from '@/__generated_REST__/posts/posts';

// NOTE: API取得後のロジック、ここをテストコード書けばよいだけにしておきたい.
//       さらに、selectorなロジックは別ファイルに切り出すか・・・？
const _postFilter = (response: GetPostsQueryResult): GetPostsQueryResult => {
  const data: GetPostsResponseBody = response.data;
  response.data = data.map(({ id, title, userId, completed }) => {
    return {
      id,
      title: title.toUpperCase(),
      userId,
      completed,
    };
  });
  return response;
};

const useGetPostList = () => {
  return useGetPosts({
    query: {
      select: _postFilter,
    },
  });

  // NOTE: hooksの中で絞ってあげてしまうのか、全部返すのかどっちがいいか？
  //       絞るメリットあるか？
  // return { data, error, isPending }
};

// NOTE: Axiosをかました時にレスポンスの返却値が変わるので、同じようにwrapしたい
// import { getGetPostsMock } from '@/api/backend.msw'

// TODO: dev環境特有？2回目のレンダリングの時に、エラーで死ぬ
//       隙間で調査、動くには動いてそうだけど、使えてないのが現実.
// const res = getGetPostsMock();

export { useGetPostList, _postFilter };
