import Image from 'next/image';

interface ImagePreviewProps {
  src: string;
  alt: string;
}

export default function ImagePreview({ src, alt }: ImagePreviewProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: 'cover', objectPosition: 'center center' }}
      sizes="300px"
    />
  );
}
