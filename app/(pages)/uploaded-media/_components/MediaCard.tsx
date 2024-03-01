'use client';
import styles from './MediaCard.module.scss';
import Image from 'next/image';

export default function MediaCard({ mediaInfo }) {
  const { src, alt, type, title } = mediaInfo;

  const startPreview = (e) => {
    const vid = e.target;
    vid.muted = true;
    vid.play();
  };

  const stopPreview = (e) => {
    const vid = e.target;
    vid.muted = false;
    vid.currentTime = 0;
    vid.pause();
  };

  return (
    <div className={styles.container}>
      <div className={styles.media_container}>
        {type === 'video' ? (
          <video
            width="350"
            controls
            onMouseEnter={startPreview}
            onMouseLeave={stopPreview}
            className={styles.media_radius}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="cover"
            className={styles.media_radius}
          />
        )}
      </div>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
    </div>
  );
}
