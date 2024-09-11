'use client';
import styles from './MediaSelector.module.scss';
import MediaFromGallery from './MediaFromGallery';
import MediaFromUpload from './MediaFromUpload';
import useContentFormContext from '@hooks/useContentFormContext';
import convertFileToMediaItem from '../../_utils/convertFileToMediaItem';

interface MediaSelectorProps {
  field_name: string;
}

export default function MediaSelector({ field_name }: MediaSelectorProps) {
  const { data, updateField } = useContentFormContext();

  const onInput = (files: FileList) => {
    const updatedFieldValue = [
      ...data[field_name],
      ...Array.from(files).map(convertFileToMediaItem),
    ];
    updateField(field_name, updatedFieldValue);
  };
  return (
    <div className={styles.container}>
      <MediaFromUpload onInput={onInput} />
      <div className={styles.or_container}>
        <div className={styles.line}></div>
        <h4> or </h4>
        <div className={styles.line}></div>
      </div>
      <MediaFromGallery />
    </div>
  );
}
