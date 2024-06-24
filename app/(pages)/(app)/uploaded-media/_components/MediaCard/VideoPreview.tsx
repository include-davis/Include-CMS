interface VideoPreviewProps {
  src: string;
  type: string;
}

export default function VideoPreview({ src, type }: VideoPreviewProps) {
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
    <video
      muted
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center center',
      }}
    >
      <source src={src} type={type} />
      <p>Unsupported video format</p>
    </video>
  );
}
