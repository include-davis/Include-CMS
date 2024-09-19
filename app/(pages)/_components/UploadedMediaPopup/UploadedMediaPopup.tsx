'use client';
import styles from './UploadedMediaPopup.module.scss';
import useSelectContext from '@app/(pages)/_hooks/useSelectContext';
import FilterContextProvider from '@app/(pages)/_contexts/FilterContext';
import MediaCard from '../MediaCard/MediaCard';
import useMedia from '@app/(pages)/_hooks/useMedia';
import MediaItem from '@app/_types/media/MediaItem';
import ContentSection from '@components/ContentSection/ContentSection';
import ContentFilters from '@components/ContentFilters/ContentFilters';
import useContentFormContext from '@app/(pages)/_hooks/useContentFormContext';

interface UploadedMediaPopupProps {
  fieldName: string;
}

export default function UploadedMediaPopup({
  fieldName,
}: UploadedMediaPopupProps) {
  const { selectMode, toggleSelectMode, selectedIds } = useSelectContext();
  const { loading, data: mediaData, error } = useMedia();
  const { updateField, data } = useContentFormContext();

  if (loading) {
    return 'loading...';
  }

  if (error) {
    return error;
  }

  const data_list = mediaData.map((mediaItem: MediaItem) => {
    return <MediaCard mediaItem={mediaItem} key={mediaItem._id} />;
  });

  const attachMedia = () => {
    const selectedMedia = Object.values(selectedIds).filter(Boolean);
    const updatedFieldValue = [...data[fieldName], ...selectedMedia];
    updateField(fieldName, updatedFieldValue);
    toggleSelectMode();
  };

  return (
    <div className={`${styles.container} ${selectMode ? styles.visible : ''}`}>
      <FilterContextProvider>
        <div className={styles.data_container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Uploaded Media</h1>
            <ContentFilters searchPlaceholder={`Search in uploaded media...`} />
          </div>
          <ContentSection title="">{data_list}</ContentSection>
        </div>
      </FilterContextProvider>
      <button className={styles.attach} onClick={attachMedia}>
        Attach media
      </button>
      <button onClick={toggleSelectMode}>exit</button>
    </div>
  );
}
