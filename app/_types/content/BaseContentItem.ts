export default interface BaseContentItem {
  _id: string;
  _name: string;
  _description: string | null;
  _published: boolean;
  _created_at: string;
  _last_modified: string;
  [key: string]: any;
}
