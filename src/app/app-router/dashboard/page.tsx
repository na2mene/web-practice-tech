import { Metadata } from 'next';
import { DashboardScreen } from '@/screens/DashboardScreen';

// metaデータの上書き
// only server component
export const metadata: Metadata = {
  title: 'dashboard page',
};

export default function DashboardPage() {
  return <DashboardScreen />;
}
