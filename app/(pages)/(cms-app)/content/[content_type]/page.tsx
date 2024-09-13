import styles from './page.module.scss';

import ContentHeader from '../../_components/ContentHeader/ContentHeader';
import ContentSection from '../../_components/ContentSection/ContentSection';
import ContentCard from '../_components/ContentCard/ContentCard';
import SelectContextProvider from '@contexts/SelectContext';
import BaseContentItem from '@app/_types/content/BaseContentItem';
import schema from '@app/_utils/schema';
import { findContentItems } from '@datalib/content/findContentItem';

interface ContentPageProps {
  params: {
    content_type: string;
  };
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { content_type } = params;
  const res = JSON.parse(JSON.stringify(await findContentItems(content_type)));

  const publishedDataList = res.body
    .filter((item: BaseContentItem) => item._published)
    .map((contentItem: BaseContentItem) => {
      return (
        <ContentCard
          content_type={schema.get(content_type)?.getName() || ''}
          contentItem={contentItem}
          key={contentItem._id}
        />
      );
    });

  const draftDataList = res.body
    .filter((item: BaseContentItem) => !item._published)
    .map((contentItem: BaseContentItem) => {
      return (
        <ContentCard
          content_type={schema.get(content_type)?.getName() || ''}
          contentItem={contentItem}
          key={contentItem._id}
        />
      );
    });

  return (
    <SelectContextProvider>
      <div className={styles.container}>
        <ContentHeader
          content_type={content_type}
          contentDisplayName={
            schema.get(content_type)?.getPluralDisplayName() || ''
          }
        />
        <ContentSection title={'Published'}>{publishedDataList}</ContentSection>
        <ContentSection title={'Drafts'}>{draftDataList}</ContentSection>
      </div>
    </SelectContextProvider>
  );
}
