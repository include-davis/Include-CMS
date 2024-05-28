import Image from 'next/image';
import styles from './Upload.module.scss';

export default function UploadedMedia() {
  return (
    <div className={styles.uploaded_media_container}>
      <Image
        src="/index/bookmark.png"
        alt="bookmark icon"
        height={43}
        width={34}
      />
      <h4> Choose from Uploaded Media </h4>
    </div>
  );
}
