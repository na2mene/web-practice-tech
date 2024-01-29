import { defineConfig } from 'orval';

export default defineConfig({
  backend: {
    input: {
      target: './openapi/web-practice-tech/openapi.yaml',
    },
    output: {
      target: './src/__generated__/api.ts',
      client: 'react-query',
      clean: true,
      mode: 'tags-split',
      mock: true,
      // prettier: true,
      // override: {
      //   // カスタムインスタンスを使う場合
      //   mutator: {
      //     path: './api/mutator/custom-instance.ts',
      //     name: 'customInstance',
      //     // default: true
      //   },
      // },
    },
  },
});
