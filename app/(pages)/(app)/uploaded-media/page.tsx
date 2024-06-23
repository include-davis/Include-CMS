'use client';
import styles from './page.module.scss';

import MediaCard from './_components/MediaCard';
import ContentHeader from '../_components/ContentHeader/ContentHeader';
import ContentSection from '../_components/ContentSection/ContentSection';

const collection_data = [
  {
    id: '1',
    name: 'test1',
    type: 'image',
    src: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    id: '2',
    name: 'test1',
    type: 'video',
    src: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    id: '3',
    name: 'test1',
    type: 'image',
    src: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    id: '4',
    name: 'test1',
    type: 'image',
    src: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    id: '5',
    name: 'test1',
    type: 'image',
    src: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    id: '6',
    name: 'test1',
    type: 'image',
    src: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
];

export default function CollectionPage() {
  const data_list = collection_data.map((card) => {
    return <MediaCard mediaInfo={card} key={card.id} />;
  });

  return (
    <div className={styles.container}>
      <ContentHeader collection={'Uploaded Media'} />
      <ContentSection title={'Published'}>{data_list}</ContentSection>
    </div>
  );
}
