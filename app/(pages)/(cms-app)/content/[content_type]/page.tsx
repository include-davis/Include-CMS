'use client';
import styles from './page.module.scss';

import ContentHeader from '../../_components/ContentHeader/ContentHeader';
import ContentSection from '../../_components/ContentSection/ContentSection';
import ContentCard from '../_components/ContentCard/ContentCard';
import SelectContextProvider from '@contexts/SelectContext';
import FilterContextProvider from '@contexts/FilterContext';
import useFindContentItems from '@hooks/useFindContentItems';
import BaseContentItem from '@app/_types/content/BaseContentItem';
import schema from '@app/_utils/schema';

interface ContentPageProps {
  params: {
    content_type: string;
  };
}

export default function ContentPage({ params }: ContentPageProps) {
  const { content_type } = params;
  const { loading, res } = useFindContentItems(content_type);

  if (loading) {
    return 'loading...';
  }

  if (!res.ok) {
    return res.error;
  }

  const dataList = res.body.map((contentItem: BaseContentItem) => {
    return (
      <ContentCard
        content_type={schema[content_type].getName()}
        contentItem={contentItem}
        key={contentItem._id}
      />
    );
  });

  return (
    <SelectContextProvider>
      <FilterContextProvider>
        <div className={styles.container}>
          <ContentHeader content_type={schema[content_type].getDisplayName()} />
          <ContentSection title={'Published'}>
            {dataList.filter((item: BaseContentItem) => item._published)}
          </ContentSection>
          <ContentSection title={'Drafts'}>
            {dataList.filter((item: BaseContentItem) => !item._published)}
          </ContentSection>
        </div>
      </FilterContextProvider>
    </SelectContextProvider>
  );
}
