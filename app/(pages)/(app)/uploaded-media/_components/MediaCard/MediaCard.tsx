'use client';
import styles from './MediaCard.module.scss';
import { LuMoreVertical } from 'react-icons/lu';
import ImagePreview from './ImagePreview';
import VideoPreview from './VideoPreview';

interface MediaInfo {
  id: string;
  name: string;
  type: string;
  src: string;
  alt: string;
}

interface Props {
  mediaInfo: MediaInfo;
}

export default function MediaCard({ mediaInfo }: Props) {
  const { src, alt, type, name } = mediaInfo;

  const preview = (() => {
    if (type.startsWith('image/')) {
      return <ImagePreview src={src} alt={alt} />;
    } else if (type.startsWith('video/')) {
      return <VideoPreview src={src} type={type} />;
    } else {
      return <div>{`No preview for media type: ${type}`}</div>;
    }
  })();

  return (
    <div className={styles.container}>
      <div className={styles.top_row}>
        <h2>{name}</h2>
        <button className={styles.kebab_button}>
          <LuMoreVertical className={styles.kebab} />
        </button>
      </div>
      <div className={styles.media_container}>{preview}</div>
    </div>
  );
}
