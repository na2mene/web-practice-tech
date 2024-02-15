import { ApplyScreen } from '@/screens/ApplyScreen';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ApplyPage({ params, searchParams }: Props) {
  return <ApplyScreen params={params} searchParams={searchParams} />;
}
