import { ApplyForm } from './ApplyForm';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const ApplyScreen = ({ params, searchParams }: Props) => {
  return (
    <>
      <h1>応募フォームです</h1>
      <ApplyForm id={params.id} />
    </>
  );
};
