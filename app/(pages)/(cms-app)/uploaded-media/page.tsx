'use server';
import styles from './page.module.scss';

import MediaCard from './_components/MediaCard/MediaCard';
import ContentHeader from '../_components/ContentHeader/ContentHeader';
import ContentSection from '../_components/ContentSection/ContentSection';
import SelectContextProvider from '@contexts/SelectContext';
import FilterContextProvider from '@contexts/FilterContext';
import { FindMediaItems } from '@actions/media/findMediaItem';
import MediaItem from '@app/_types/media/media';

export default async function MediaPage() {
  const res = await FindMediaItems();
  console.log(res);
  if (!res.ok) {
    return 'Error fetching Media data';
  }

  const data_list = res.body.map((mediaItem: MediaItem) => {
    return <MediaCard mediaItem={mediaItem} key={mediaItem._id} />;
  });

  return (
    <SelectContextProvider>
      <FilterContextProvider>
        <div className={styles.container}>
          <ContentHeader
            content_type="media"
            contentDisplayName="Uploaded Media"
          />
          <ContentSection title="">{data_list}</ContentSection>
        </div>
      </FilterContextProvider>
    </SelectContextProvider>
  );
}
