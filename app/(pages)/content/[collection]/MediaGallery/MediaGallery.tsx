import React from 'react';
import Image from 'next/image';
import './MediaGallery.scss';

interface MediaGalleryProps {
  name: string;
  images: string[];
  cardNumber: number;
  totalCards: number;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  name,
  images,
  cardNumber,
  totalCards,
}) => {
  const isFirstImage = cardNumber === 1;
  const getFileSizeInKB = (url: string) => {
    return Math.round((url.length * 0.75) / 1024); // Assuming URL is base64 encoded
  };

  return (
    <div className="media-gallery-card">
      <div className="media-gallery-card-number">#{cardNumber}</div>
      <div className="media-gallery-card-preview">
        <img src={images[0]} alt={name} />
      </div>
      <div className="media-gallery-card-details">
        <h4>{name}</h4>
        <p>
          Card {cardNumber} of {totalCards}
        </p>
        {isFirstImage && <div className="cover-image">Cover Image</div>}
      </div>
      <div className="image-size">{getFileSizeInKB(images[0])} KB</div>
      <button className="replace-image-button">Replace Image</button>
      {/* <button className="delete-image-button">Delete Image</button> */}
      <button className="delete-image-button">
        <Image src="/deleteimage.png" alt="Delete" width={25} height={25} />
      </button>
    </div>
  );
};

export default MediaGallery;
