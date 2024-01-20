import { Metadata } from 'next'
import Link from 'next/link'

// metaデータの上書き
// only server component
export const metadata: Metadata = {
  title: 'dashboard page',
}

export default function DashboardPage() {
  return (
    <>
      <h1>ダッシュボードです</h1>
      <Link href="/app-router/job_offers">求人一覧ページへ</Link>
    </>
  )
}
