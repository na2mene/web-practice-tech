import { Metadata } from 'next'

// metaデータの上書き
// only server component
export const metadata: Metadata = {
  title: 'app-router page',
  metadataBase: new URL('https://acme.com'),
}

export default function Page() {
  return <h1>App Routerで動くページ</h1>
}
