import { Metadata } from 'next'
import { WrapLink } from '@/components/WrapLink'

// metaデータの上書き
// only server component
export const metadata: Metadata = {
  title: 'dashboard page',
}

export default function DashboardPage() {
  return (
    <>
      <h1>ダッシュボードです</h1>
      <WrapLink href="/app-router/job_offers">求人一覧ページへ</WrapLink>
    </>
  )
}
