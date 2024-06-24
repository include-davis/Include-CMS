'use client';
import schema from '@configs/_schema/_index';
import styles from './page.module.scss';

import ContentHeader from '../../_components/ContentHeader/ContentHeader';
import ContentSection from '../../_components/ContentSection/ContentSection';
import ContentCard from '../_components/ContentCard/ContentCard';
import { SelectContextProvider } from '@contexts/SelectContext';

interface CollectionPageProps {
  params: {
    collection?: string;
  };
}

const image_list = [
  {
    url: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    url: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    url: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    url: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    url: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
  {
    url: '/content/sample_images/city.jpg',
    alt: 'city image',
  },
];

const collection_data = [
  {
    id: '1',
    name: 'test1',
    last_edited: '11-1-1',
    images: image_list.slice(5),
    description: 'some description',
  },
  {
    id: '2',
    name: 'test2',
    last_edited: '11-1-1',
    images: image_list.slice(6),
    description: 'some description',
  },
  {
    id: '3',
    name: 'test3',
    last_edited: '11-1-1',
    images: image_list.slice(4),
    description: 'some description',
  },
  {
    id: '4',
    name: 'test4',
    last_edited: '11-1-1',
    images: image_list.slice(3),
    description: 'some description',
  },
  {
    id: '5',
    name: 'test5',
    last_edited: '11-1-1',
    images: image_list.slice(2),
    description: 'some description',
  },
  {
    id: '6',
    name: 'test6',
    last_edited: '11-1-1',
    images: image_list.slice(1),
    description:
      'Loros et molestiae nisi ea tenetur, magnam est dolorum cum odio doloribus at? Doloribus dignissimos neque sunt.',
  },
];

export default function CollectionPage({ params }: CollectionPageProps) {
  const { collection } = params;

  // place into hook
  const currentCollection = schema.find(
    (section) =>
      section.name.toLowerCase() === collection?.toString().toLowerCase()
  );

  if (!currentCollection) {
    return <div>Invalid collection</div>;
  }

  const data_list = collection_data.map((card) => {
    return (
      <ContentCard
        {...card}
        key={card.id}
        collection={currentCollection.name.toLowerCase()}
      />
    );
  });

  return (
    <SelectContextProvider>
      <div className={styles.container}>
        <ContentHeader collection={currentCollection.name} />
        <ContentSection title={'Published'}>{data_list}</ContentSection>
        <ContentSection title={'Drafts'}>{data_list}</ContentSection>
      </div>
    </SelectContextProvider>
  );
}
