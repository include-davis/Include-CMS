'use client';
import styles from './MediaCard.module.scss';
import Image from 'next/image';
import { LuMoreVertical } from 'react-icons/lu';

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

  const startPreview = (e: React.MouseEvent<HTMLVideoElement>) => {
    const vid = e.target as HTMLVideoElement;
    vid.play();
  };

  const stopPreview = (e: React.MouseEvent<HTMLVideoElement>) => {
    const vid = e.target as HTMLVideoElement;
    vid.currentTime = 0;
    vid.pause();
  };

  return (
    <div className={styles.container}>
      <div className={styles.top_row}>
        <h2>{name}</h2>
        <button className={styles.kebab_button}>
          <LuMoreVertical className={styles.kebab} />
        </button>
      </div>
      <div className={styles.media_container}>
        {type === 'video' ? (
          <video
            poster={src}
            onMouseEnter={startPreview}
            onMouseLeave={stopPreview}
            muted
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <Image src={src} alt={alt} fill className={styles.media_radius} />
        )}
      </div>
    </div>
  );
}
