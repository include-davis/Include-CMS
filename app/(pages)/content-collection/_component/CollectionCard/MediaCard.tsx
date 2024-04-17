'use client';
import styles from './CollectionCard.module.scss'
import Image from 'next/image';

export default function MediaCardPlaceholder() {
   return (
    <div className={styles.media_container}>
        <div className={styles.edit_container}>
            <div className={styles.title_container}>
                <div className={styles.title}>
                    <p> Wedding name 1 </p>
                </div>
                <Image 
                src="/index/select-icon.png"
                alt="serene forest scene in the night"
                height={20}
                width={4}
                className={styles.select} 
                />
            </div>
            <p>last edited: 11-03-24</p>
        </div>
        <div className={styles.img_container}>
            <div className={styles.two_img_container}>
                <Image 
                src="/index/city.jpg"
                alt="serene forest scene in the night"
                layout="fill" 
                objectFit="cover" 
                className={styles.first_img_radius} 
                />
            </div>
            <div className={styles.two_img_container}>
                <Image 
                src="/index/city.jpg"
                alt="serene forest scene in the night"
                layout="fill" 
                objectFit="cover" 
                className={styles.second_img_radius} 
                />
            </div>     
        </div>
        <div className={styles.description}>
            <p> A short description that the user inputs in the next screen. </p>
        </div>
    </div>
    );
  }
  