import { defineConfig } from 'orval';

export default defineConfig({
  backend: {
    input: {
      target: './openapi/web-practice-tech/openapi.yaml',
    },
    output: {
      target: './src/__generated_REST__/api.ts',
      client: 'react-query',
      clean: true,
      mode: 'tags-split',
      mock: true,
      // prettierは、グローバルにインストールされたものしかできないらしく、回避策としてが以下
      // @see: https://github.com/anymaniax/orval/issues/234
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
