import { WrapLink } from '@/components/shared/WrapLink';

export const DashboardScreen = () => {
  return (
    <>
      <h1>ダッシュボードです</h1>
      <WrapLink href='/app-router/job_offers'>求人一覧ページへ</WrapLink>
    </>
  );
};
