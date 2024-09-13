import Image from 'next/image';
import styles from './MediaFromGallery.module.scss';
import bookmarkIcon from '@public/content/form/bookmark.png';

export default function MediaFromGallery() {
  return (
    <div className={styles.container}>
      <Image src={bookmarkIcon} alt="bookmark icon" height={43} width={34} />
      <h4> Choose from Uploaded Media </h4>
    </div>
  );
}
