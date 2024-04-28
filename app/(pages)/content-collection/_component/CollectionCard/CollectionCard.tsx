'use client';
import styles from './CollectionCard.module.scss';
import MediaPreview from './MediaPreview';

interface CollectionCardProps {
  images: string[];
}

export default function CollectionCard({ images }: CollectionCardProps) {
  return (
    <div className={styles.media_container}>
      <div className={styles.edit_container}>
        <div className={styles.title_container}>
          <div className={styles.title}>
            <p> Wedding name 1 </p>
          </div>
        </div>
        <p>last edited: 11-03-24</p>
      </div>
      <MediaPreview images={images} />
      <div className={styles.description}>
        <p> A short description that the user inputs in the next screen. </p>
      </div>
    </div>
  );
}
