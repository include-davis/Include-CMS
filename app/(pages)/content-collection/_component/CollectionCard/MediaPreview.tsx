import React from 'react';
import Image from 'next/image';
import styles from './MediaPreview.module.scss';

interface MediaPreviewProps {
  images: string[];
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ images }) => {
  const determineGridClass = () => {
    const numImages = images.length;
    switch (numImages) {
      case 1:
        return styles.singleImage;
      case 2:
        return styles.twoImages;
      default:
        return `${styles.gridLayout} ${styles.moreThanTwoImages}`;
    }
  };

  return (
    <div className={`${styles.mediaPreview} ${determineGridClass()}`}>
      {images.slice(0, 3).map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          style={index > 0 ? { zIndex: 0 } : undefined}
          width="100"
          height="100"
        />
      ))}
      {images.length > 3 && (
        <div className={styles.additionalImages}>{images.length - 3}</div>
      )}
    </div>
  );
};

export default MediaPreview;
