interface MediaItem {
  _id: string | null;
  name: string;
  type: string;
  format: string;
  src: string;
  alt?: string;
  size: number;
  width: number | null;
  height: number | null;
  uploaded: boolean;
}

export default MediaItem;
