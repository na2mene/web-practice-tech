import { Metadata } from 'next'

// metaデータの上書き
// only server component
export const metadata: Metadata = {
  title: 'dashboard page',
}

export default function DashboardPage() {
  return <h1>ダッシュボードです</h1>
}
