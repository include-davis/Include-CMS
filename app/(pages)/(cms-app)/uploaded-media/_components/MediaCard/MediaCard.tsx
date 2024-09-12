'use client';
import styles from './MediaCard.module.scss';
import ImagePreview from './ImagePreview';
import VideoPreview from './VideoPreview';
import MediaItem from '@typeDefs/media/MediaItem';
import useSelectContext from '@hooks/useSelectContext';
import checkMark from '/public/content/[content_type]/check.svg';
import Image from 'next/image';

interface Props {
  mediaItem: MediaItem;
}

export default function MediaCard({ mediaItem }: Props) {
  const { src, alt, type, name, format } = mediaItem;
  const { selectedIds, toggleId, selectMode } = useSelectContext();

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
        {selectMode && (
          <div
            className={styles.checkbox_container}
            onClick={() => toggleId(mediaItem._id || '')}
          >
            {selectedIds[mediaItem._id || ''] && (
              <div className={styles.checkbox_internals}>
                <Image src={checkMark} alt="checkmark" fill sizes="30px" />
              </div>
            )}
          </div>
        )}
        <h2>{name}</h2>
      </div>
      <div className={styles.media_container}>{preview}</div>
    </div>
  );
}
