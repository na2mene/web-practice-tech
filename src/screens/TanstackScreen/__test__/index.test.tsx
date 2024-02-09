// Integrationテスト（画面レベルでのテストで担保したい箇所だけを書く）

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockPosts } from '@/__mocks__/posts';

import { TanstackScreen } from '..';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AxiosProvider from '@/providers/AxiosProvider';
import TanstackQueryProvider from '@/providers/TanstackQueryProvider';

jest.mock('@/screens/TanstackScreen/useGetPostList', () => ({
  useGetPostList: jest.fn(() => ({
    data: {
      data: mockPosts.map(({ id, title, userId, completed }) => {
        return {
          id,
          title: title.toUpperCase(),
          userId,
          completed,
        };
      }),
      status: 200,
    },
    isPending: false,
    error: false,
  })),
}));

describe('Tanstack screen', () => {
  describe('waitForを使って表現した場合', () => {
    it('データ取得ができていること', async () => {
      const mock = new MockAdapter(axios);
      mock.onGet('/posts').reply(200, mockPosts);

      render(
        <AxiosProvider>
          <TanstackQueryProvider>
            <TanstackScreen />
          </TanstackQueryProvider>
        </AxiosProvider>,
      );

      // NOTE: jest.mockがいるので、実際はwaitFor関係ない
      //       外したら、waitForで確認できるコード
      await waitFor(() => {
        const actual = screen.getByText('POST ONE');
        expect(actual).toBeInTheDocument();
      });
    });
  });

  describe('データ取得部分をモックした場合', () => {
    it('データ取得ができていること', async () => {
      const mock = new MockAdapter(axios);
      mock.onGet('/posts').reply(200, mockPosts);

      render(
        <AxiosProvider>
          <TanstackQueryProvider>
            <TanstackScreen />
          </TanstackQueryProvider>
        </AxiosProvider>,
      );

      const actual = await screen.getByText('POST ONE');
      expect(actual).toBeInTheDocument();
    });
  });
});
