import AxiosProvider from '@/providers/AxiosProvider';
import TanstackQueryProvider from '@/providers/TanstackQueryProvider';

export default function AppRouterLayout({ children }: { children: React.ReactNode }) {
  return (
    <AxiosProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </AxiosProvider>
  );
}
