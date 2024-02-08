import axios from 'axios';
import { getPosts } from '@/__generated__/posts/posts';
import { _postFilter } from '../useGetPostList';
import MockAdapter from 'axios-mock-adapter';
import { mockPosts } from '@/__mocks__/posts';

describe('_postFilter', () => {
  it('受け取ったデータを正しくフィルタリングできていること', async () => {
    // モックを作る
    const mock = new MockAdapter(axios);
    mock.onGet('/posts').reply(200, mockPosts);

    // orvalで生成したコードの中に axios.get('/posts') があるのでそれを使う
    const response = await getPosts();
    const actual = _postFilter(response);

    // 期待される結果
    const expected = mockPosts.map((post) => ({
      ...post,
      title: post.title.toUpperCase(),
    }));

    // 関数の結果が期待される結果と一致することを確認
    expect(actual.data).toEqual(expected);
  });
});
