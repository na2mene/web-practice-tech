import { TanstackScreen } from '@/screens/TanstackScreen/index';

// NOTE: Axiosをかました時にレスポンスの返却値が変わるので、同じようにwrapしたい
// import { getGetPostsMock } from '@/api/backend.msw'

export default function TanstackPage() {
  return <TanstackScreen />;
}
