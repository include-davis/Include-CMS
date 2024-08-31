'use client';
import styles from './page.module.scss';

import ContentHeader from '../../_components/ContentHeader/ContentHeader';
import ContentSection from '../../_components/ContentSection/ContentSection';
import ContentCard from '../_components/ContentCard/ContentCard';
import SelectContextProvider from '@contexts/SelectContext';
import FilterContextProvider from '@contexts/FilterContext';
import useFindContentItems from '@hooks/useFindContentItems';
import ContentItemPreview from '@app/_types/content/contentItemPreview';

interface CollectionPageProps {
  params: {
    content_type: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { content_type } = params;
  const { loading, res } = useFindContentItems(content_type);

  if (loading) {
    return 'loading...';
  }

  if (res.error) {
    return res.error;
  }

  const data_list = res.data.map((contentItemPreview: ContentItemPreview) => {
    return (
      <ContentCard
        {...card}
        key={card.id}
        collection={collection_schema.name.toLowerCase()}
      />
    );
  });

  return (
    <SelectContextProvider>
      <FilterContextProvider>
        <div className={styles.container}>
          <ContentHeader collection={collection_schema.name} />
          <ContentSection title={'Published'}>{data_list}</ContentSection>
          <ContentSection title={'Drafts'}>{data_list}</ContentSection>
        </div>
      </FilterContextProvider>
    </SelectContextProvider>
  );
}
