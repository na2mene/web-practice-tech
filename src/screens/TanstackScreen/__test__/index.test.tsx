// Integrationテスト（画面レベルでのテストで担保したい箇所だけを書く）

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockPosts } from '@/__mocks__/posts';

import { TanstackScreen } from '..';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AxiosProvider from '@/providers/AxiosProvider';
import TanstackQueryProvider from '@/providers/TanstackQueryProvider';

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

      await waitFor(() => {
        const actual = screen.getByText('POST ONE');
        expect(actual).toBeInTheDocument();
      });
    });
  });

  // TODO: （挙動だけみると）うまくモックできてない？
  xdescribe('データ取得部分をモックした場合', () => {
    it('データ取得ができていること', async () => {
      const mock = new MockAdapter(axios);
      mock.onGet('/posts').reply(200, mockPosts);

      jest.mock('@/__generated_REST__/posts/posts', () => ({
        useGetPosts: jest.fn(() => ({
          data: mockPosts,
          isPending: false,
          error: false,
        })),
      }));

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
