'use client';
import styles from './MediaSelector.module.scss';
import MediaFromGallery from './MediaFromGallery';
import MediaFromUpload from './MediaFromUpload';

interface MediaSelectorProps {
  field_name: string;
}

export default function MediaSelector({ field_name }: MediaSelectorProps) {
  return (
    <div className={styles.container}>
      <MediaFromUpload field_name={field_name} />
      <div className={styles.or_container}>
        <div className={styles.line}></div>
        <h4> or </h4>
        <div className={styles.line}></div>
      </div>
      <MediaFromGallery />
    </div>
  );
}
