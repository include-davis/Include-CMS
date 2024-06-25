import Image from 'next/image';
import styles from './MediaListSection.module.scss';
import bookmarkIcon from '/public/content/edit/bookmark.png';

export default function ChooseFromGallery() {
  return (
    <div className={styles.uploaded_media_container}>
      <Image src={bookmarkIcon} alt="bookmark icon" height={43} width={34} />
      <h4> Choose from Uploaded Media </h4>
    </div>
  );
}
