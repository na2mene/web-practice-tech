import { usePathname } from 'next/navigation';

const useNavigationPathname = () => {
  const pathname = usePathname();
  return pathname;
};

export { useNavigationPathname };
