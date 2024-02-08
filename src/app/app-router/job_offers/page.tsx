import { Metadata } from 'next';
import { JobOfferSearchListScreen } from '@/screens/JobOfferSearchListScreen';

// metaデータの上書き
// only server component
export const metadata: Metadata = {
  title: 'job_offer page',
};

export default function JobOfferSearchListPage() {
  return <JobOfferSearchListScreen />;
}
