import { Metadata } from 'next';
import { WrapLink } from '@/components/WrapLink';

// metaデータの上書き
// only server component
export const metadata: Metadata = {
  title: 'handle error page',
  metadataBase: new URL('https://acme.com'),
};

export default function HandleError() {
  // throw '何かしらのエラー、error.tsxでハンドリング';
  return (
    <>
      <h1>ここには到達しない予定のページ</h1>
      <WrapLink href='/app-router'>app-routerページへ</WrapLink>
    </>
  );
}
