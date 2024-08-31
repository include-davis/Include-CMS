import MediaItem from '@typeDefs/media/media';
export default interface ContentItemPreview {
  content_name: string;
  content_description: string;
  last_edited: string;
  preview_media: MediaItem[];
}
