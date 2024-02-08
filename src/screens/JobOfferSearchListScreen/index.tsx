import { WrapLink } from '@/components/shared/WrapLink';

export const JobOfferSearchListScreen = () => {
  const jobOffers = [
    {
      id: 1,
      title: '聖光病院急募〜未経験可〜',
    },
    {
      id: 2,
      title: '慈愛病院募集！給与高め',
    },
    {
      id: 3,
      title: 'マリア病院で働きませんか？土日休めます',
    },
  ];

  return (
    <>
      <h1>求人一覧です</h1>
      {jobOffers.map((jobOffer) => (
        <div key={jobOffer.id}>
          <WrapLink
            href={`/app-router/job_offers/${jobOffer.id}`}
          >{`求人詳細: ${jobOffer.title}のページへ`}</WrapLink>
        </div>
      ))}
    </>
  );
};
