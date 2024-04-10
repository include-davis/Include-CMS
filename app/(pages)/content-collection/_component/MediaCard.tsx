'use client';
import styles from '../../uploaded-media/_components/MediaCard.module.scss';
import Image from 'next/image';

export default function MediaCardPlaceholder() {
   return (
   <div className={styles.media_container}>
        <div className={styles.title}>
            <p> Wedding.png  </p>
        </div>
        <div className={styles.img_container}>
            <Image 
            src="/index/city.jpg"
            alt="serene forest scene in the night"
            layout="fill" 
            objectFit="cover" 
            className={styles.media_radius} 
            />        
        </div>
    </div>
    );
  }
  