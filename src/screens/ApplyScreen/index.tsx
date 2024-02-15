import { Form } from './Form';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const ApplyScreen = ({ params, searchParams }: Props) => {
  return (
    <>
      <h1>応募フォームです</h1>
      <Form />
    </>
  );
};
