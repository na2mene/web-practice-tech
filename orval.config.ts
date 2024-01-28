import { defineConfig } from 'orval';

export default defineConfig({
  backend: {
    input: {
      target: './openapi/web-practice-tech/openapi.yaml',
    },
    output: {
      target: './src/apis/backend.ts',
      client: 'react-query',
      clean: true,
      mode: 'tags-split',
      mock: true,
      useExamples: true,
      locale: 'ja',
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
