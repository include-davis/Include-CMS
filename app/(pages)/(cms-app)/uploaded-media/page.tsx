'use server';
import styles from './page.module.scss';

import MediaCard from '@components/MediaCard/MediaCard';
import MediaHeader from '@components/MediaHeader/MediaHeader';
import ContentSection from '@components/ContentSection/ContentSection';
import SelectContextProvider from '@contexts/SelectContext';
import FilterContextProvider from '@contexts/FilterContext';
import { findMediaItems } from '@datalib/media/findMediaItem';
import MediaItem from '@typeDefs/media/MediaItem';

export default async function MediaPage() {
  const res = JSON.parse(JSON.stringify(await findMediaItems()));
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
          <MediaHeader />
          <ContentSection title="">{data_list}</ContentSection>
        </div>
      </FilterContextProvider>
    </SelectContextProvider>
  );
}
