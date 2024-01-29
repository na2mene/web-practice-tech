import { cpSync } from 'fs';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// 動的なmetaデータの上書き
// only server component
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const data = await res.json();

  // こんなイメージで、画像のパスが格納されているDBからデータもってきて、URLを差し込む
  // const jobOfferData = await fetch('https://example.com/job_offers/1').then(
  //   async (res) => await res.json()
  // );

  const jobOfferData = {
    url: 'https://via.placeholder.com/200x100',
    title: '聖光病院急募〜未経験可〜',
    alt: '聖光病院',
  };

  return {
    title: `${data.id}: ${jobOfferData.title}`,
    description: `ディスクリプション:${data.id} ${data.body}`,
    openGraph: {
      title: `${data.id}: ${jobOfferData.title}`,
      description: `ディスクリプション:${data.id} ${data.body}`,
      images: [
        {
          url: jobOfferData.url,
          width: 1200,
          height: 630,
          alt: jobOfferData.alt,
        },
      ],
    },
  };

  //
  // Sample Code.
  //
  // // read route params
  // const id = params.id

  // // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  // return {
  //   title: product.title,
  //   openGraph: {
  //     images: ['/some-specific-page-image.jpg', ...previousImages],
  //   },
  // }
}

export default function JobOfferDetailPage({ params, searchParams }: Props) {
  return <h1>求人詳細です</h1>;
}
