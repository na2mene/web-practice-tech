import { Metadata } from 'next';
import { AppRouterScreen } from '@/screens/AppRouterScreen';

// metaデータの上書き
// only server component
export const metadata: Metadata = {
  title: 'app-router page',
  metadataBase: new URL('https://acme.com'),
};

export default function AppRouterPage() {
  return <AppRouterScreen />;
}
