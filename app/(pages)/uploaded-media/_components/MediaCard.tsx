'use client';
import styles from './MediaCard.module.scss';
import Image from 'next/image';

interface MediaInfo {
  src: string;
  alt: string;
  type: string;
  title: string;
}

interface Props {
  mediaInfo: MediaInfo;
}

export default function MediaCard({ mediaInfo }: Props) {
  const { src, alt, type, title } = mediaInfo;

  const startPreview = (e: React.MouseEvent<HTMLVideoElement>) => {
    const vid = e.target as HTMLVideoElement;
    vid.muted = true;
    vid.play();
  };

  const stopPreview = (e: React.MouseEvent<HTMLVideoElement>) => {
    const vid = e.target as HTMLVideoElement;
    vid.muted = false;
    vid.currentTime = 0;
    vid.pause();
  };

  return (
    <div className={styles.media_container}>
      {type === 'video' ? (
        <div className={styles.video_container}>
          <video
            width="350"
            controls
            poster={src}
            onMouseEnter={startPreview}
            onMouseLeave={stopPreview}
            className={styles.media_radius}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className={styles.img_container}>
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="cover"
            className={styles.media_radius}
          />
        </div>
      )}
      <div className={styles.title}>
        <p>{title}</p>
      </div>
    </div>
  );
}
