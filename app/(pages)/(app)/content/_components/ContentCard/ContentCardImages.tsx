import styles from './ContentCardImages.module.scss';
import Image from 'next/image';

interface ContentCardImagesInterface {
  images: {
    url: string;
    alt: string;
  }[];
}

export default function ContentCardImages({
  images,
}: ContentCardImagesInterface) {
  const n = images.length;
  switch (n) {
    case 0:
      return <div className={styles.container} />;
    case 1:
      return (
        <div className={styles.container}>
          <Image src={images[0].url} alt={images[0].alt} fill />
        </div>
      );
    case 2:
      return (
        <div className={styles.container}>
          <div className={styles.primary}>
            <Image src={images[0].url} alt={images[0].alt} fill />
          </div>
          <div className={styles.secondary}>
            <Image src={images[1].url} alt={images[1].alt} fill />
          </div>
        </div>
      );
    default:
      return (
        <div className={styles.container}>
          <div className={styles.primary}>
            <Image src={images[0].url} alt={images[0].alt} fill />
          </div>
          <div className={styles.secondary}>
            <div>
              <Image src={images[1].url} alt={images[1].alt} fill />
            </div>
            <div className={styles.bottom}>
              <Image src={images[2].url} alt={images[2].alt} fill />
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
