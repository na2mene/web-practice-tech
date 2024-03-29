/**
 * Generated by orval v6.23.0 🍺
 * Do not edit manually.
 * Web Practice Tech API
 * Web Practice Tech API
 * OpenAPI spec version: 0.0.1
 */
import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';

export const getGetPostsMock = () =>
  Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    completed: faker.word.sample(),
    id: faker.number.int({ min: undefined, max: undefined }),
    title: faker.word.sample(),
    userId: faker.number.int({ min: undefined, max: undefined }),
  }));

export const getDeletePostMock = () => ({});

export const getGetPostMock = () => ({
  completed: faker.word.sample(),
  id: faker.number.int({ min: undefined, max: undefined }),
  title: faker.word.sample(),
  userId: faker.number.int({ min: undefined, max: undefined }),
});

export const getUpdatePostMock = () =>
  Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    completed: faker.word.sample(),
    id: faker.number.int({ min: undefined, max: undefined }),
    title: faker.word.sample(),
    userId: faker.number.int({ min: undefined, max: undefined }),
  }));

export const getGetPostCommentsMock = () =>
  Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    body: faker.word.sample(),
    email: faker.word.sample(),
    id: faker.number.int({ min: undefined, max: undefined }),
    name: faker.word.sample(),
    postId: faker.number.int({ min: undefined, max: undefined }),
  }));

export const getPostsMock = () => [
  http.get('*/posts', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetPostsMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.delete('*/posts/:postId', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getDeletePostMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('*/posts/:postId', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetPostMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.put('*/posts/:postId', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getUpdatePostMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('*/posts/:postId/comments', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetPostCommentsMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
