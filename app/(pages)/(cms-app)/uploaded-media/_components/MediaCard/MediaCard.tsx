'use client';
import styles from './MediaCard.module.scss';
import { LuMoreVertical } from 'react-icons/lu';
import ImagePreview from './ImagePreview';
import VideoPreview from './VideoPreview';
import MediaItem from '@app/_types/media/media';

interface Props {
  mediaItem: MediaItem;
}

export default function MediaCard({ mediaItem }: Props) {
  const { src, alt, type, name, format } = mediaItem;

  const preview = (() => {
    switch (type) {
      case 'image':
        return <ImagePreview src={src} alt={alt || ''} />;
      case 'video':
        return <VideoPreview src={src} type={type} />;
      default:
        return format === 'pdf' ? (
          <ImagePreview src={src.replace(/\.pdf$/, '.jpg')} alt={alt || ''} />
        ) : (
          <div>{`No preview for media type: ${type}`}</div>
        );
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
