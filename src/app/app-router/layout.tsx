import AxiosProvider from './AxiosProvider';
import TanstackQueryProvider from './TanstackQueryProvider';

export default function AppRouterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AxiosProvider>
      <TanstackQueryProvider>
        {children}
      </TanstackQueryProvider>
    </AxiosProvider>
  )
}
