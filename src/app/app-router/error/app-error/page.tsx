import { Metadata } from 'next'
import Link from 'next/link'

// metaデータの上書き
// only server component
export const metadata: Metadata = {
  title: 'app error page',
  metadataBase: new URL('https://acme.com'),
}

export default function GlobalError() {
  throw '何かしらのエラー、Rootにある、error.tsxでハンドリング';
  return (
    <>
      <h1>ここには到達しない予定のページ</h1>
      <Link href="/app-router">app-routerページへ</Link>
    </>
  )
}