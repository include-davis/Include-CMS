import MediaItem from '@typeDefs/media/media';
export default interface ContentItemPreview {
  _id: string;
  _name: string;
  _description: string | null;
  last_modified: string;
  preview_media: MediaItem[];
}
