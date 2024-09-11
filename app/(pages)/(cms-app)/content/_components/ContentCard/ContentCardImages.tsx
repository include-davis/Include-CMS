import MediaItem from '@app/_types/media/media';
import styles from './ContentCardImages.module.scss';
import Image from 'next/image';

interface ContentCardImagesInterface {
  images: MediaItem[];
}

export default function ContentCardImages({
  images,
}: ContentCardImagesInterface) {
  const previewImages = images.map((image) => ({
    ...image,
    src: image.src.replace(/\.pdf$/, '.jpg'),
  }));

  const n = previewImages.length;
  switch (n) {
    case 0:
      return <div className={styles.container} />;
    case 1:
      return (
        <div className={styles.container}>
          <Image
            src={previewImages[0].src}
            alt={previewImages[0].alt || ''}
            fill
            sizes="300px"
          />
        </div>
      );
    case 2:
      return (
        <div className={styles.container}>
          <div className={styles.primary}>
            <Image
              src={previewImages[0].src}
              alt={previewImages[0].alt || ''}
              fill
              sizes="300px"
            />
          </div>
          <div className={styles.secondary}>
            <Image
              src={previewImages[1].src}
              alt={previewImages[1].alt || ''}
              fill
              sizes="300px"
            />
          </div>
        </div>
      );
    default:
      return (
        <div className={styles.container}>
          <div className={styles.primary}>
            <Image
              src={previewImages[0].src}
              alt={previewImages[0].alt || ''}
              fill
              sizes="300px"
            />
          </div>
          <div className={styles.secondary}>
            <div>
              <Image
                src={previewImages[1].src}
                alt={previewImages[1].alt || ''}
                fill
                sizes="300px"
              />
            </div>
            <div className={styles.bottom}>
              <Image
                src={previewImages[2].src}
                alt={previewImages[2].alt || ''}
                fill
                sizes="300px"
              />
              <p
                className={`${styles.additional} ${n > 3 ? styles.show : null}`}
              >
                {n - 3}+
              </p>
            </div>
          </div>
        </div>
      );
  }
}
