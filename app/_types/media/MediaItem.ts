interface MediaItem {
  _id: string | null;
  cloudinary_id: string | null;
  name: string;
  type: string;
  format: string;
  src: string;
  alt?: string;
  size: number;
  width: number | null;
  height: number | null;
  _created_at?: string | null;
  _last_modified?: string | null;
}

export default MediaItem;
