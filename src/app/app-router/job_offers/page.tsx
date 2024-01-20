import { Metadata } from 'next'

// metaデータの上書き
// only server component
export const metadata: Metadata = {
  title: 'job_offer page',
}

export default function JobOfferPage() {
  return <h1>求人一覧です</h1>
}
