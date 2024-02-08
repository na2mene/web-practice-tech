import AxiosProvider from '@/providers/AxiosProvider';
import TanstackQueryProvider from '@/providers/TanstackQueryProvider';
import JotaiProvider from '@/providers/JotaiProvider';

export default function AppRouterLayout({ children }: { children: React.ReactNode }) {
  return (
    <AxiosProvider>
      <JotaiProvider>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </JotaiProvider>
    </AxiosProvider>
  );
}
