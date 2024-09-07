import MediaItem from '@app/_types/media/media';

export default function convertFileToMediaItem(file: File): MediaItem {
  const [fileType, fileFormat] = file.type.split('/');
  return {
    _id: null,
    name: file.name,
    type: fileType,
    format: fileFormat,
    src: URL.createObjectURL(file),
    size: file.size,
    width: null,
    height: null,
    uploaded: false,
  };
}
