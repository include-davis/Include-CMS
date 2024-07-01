'use client';
import styles from './page.module.scss';

import MediaCard from './_components/MediaCard/MediaCard';
import ContentHeader from '../_components/ContentHeader/ContentHeader';
import ContentSection from '../_components/ContentSection/ContentSection';
import SelectContextProvider from '@contexts/SelectContext';

const collection_data = [
  {
    id: '1',
    name: 'test1',
    type: 'image/jpeg',
    src: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    id: '2',
    name: 'test1',
    type: 'video/mp4',
    src: '/uploaded-media/sample_media/random.mp4',
    alt: 'city image',
  },
  {
    id: '3',
    name: 'test1',
    type: 'image/jpeg',
    src: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    id: '4',
    name: 'test1',
    type: 'image/jpeg',
    src: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    id: '5',
    name: 'test1',
    type: 'image/jpeg',
    src: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    id: '6',
    name: 'test1',
    type: 'image/jpeg',
    src: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
];

export default function CollectionPage() {
  const data_list = collection_data.map((card) => {
    return <MediaCard mediaInfo={card} key={card.id} />;
  });

  return (
    <SelectContextProvider>
      <div className={styles.container}>
        <ContentHeader collection={'Uploaded Media'} />
        <ContentSection title={'Some Collection Type'}>
          {data_list}
        </ContentSection>
      </div>
    </SelectContextProvider>
  );
}
