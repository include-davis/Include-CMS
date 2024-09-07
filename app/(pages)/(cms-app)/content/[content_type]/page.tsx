'use client';
import styles from './page.module.scss';

import ContentHeader from '../../_components/ContentHeader/ContentHeader';
import ContentSection from '../../_components/ContentSection/ContentSection';
import ContentCard from '../_components/ContentCard/ContentCard';
import SelectContextProvider from '@contexts/SelectContext';
import FilterContextProvider from '@contexts/FilterContext';
import useFindContentItems from '@hooks/useFindContentItems';
import ContentItemPreview from '@app/_types/content/contentItemPreview';
import schema from '@app/_utils/schema';
import MediaItem from '@app/_types/media/media';

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

  const preview_data = res?.body.map((item: ContentItemPreview) => {
    const fieldArray = schema[content_type].getFieldArray();
    const itemMedia = fieldArray
      .filter(
        (fieldItem) => !['mediaList', 'mediaItem'].includes(fieldItem.type)
      )
      .flat();

    const previewMedia = itemMedia.filter(
      (mediaItem: MediaItem) => mediaItem.type === 'image'
    );

    return {
      _id: item._id,
      _name: item._name,
      _description: item._description,
      last_modified: item.last_modified,
      preview_media: previewMedia,
    };
  });

  const data_list = preview_data.map(
    (contentItemPreview: ContentItemPreview) => {
      return (
        <ContentCard
          content_type={schema[content_type].getName()}
          _id={contentItemPreview._id}
          _name={contentItemPreview._name}
          _description={contentItemPreview._description || ''}
          last_modified={contentItemPreview.last_modified}
          preview_media={contentItemPreview.preview_media}
          key={contentItemPreview._id}
        />
      );
    }
  );

  return (
    <SelectContextProvider>
      <FilterContextProvider>
        <div className={styles.container}>
          <ContentHeader content_type={schema[content_type].getDisplayName()} />
          <ContentSection title={'Published'}>{data_list}</ContentSection>
          <ContentSection title={'Drafts'}>{data_list}</ContentSection>
        </div>
      </FilterContextProvider>
    </SelectContextProvider>
  );
}
