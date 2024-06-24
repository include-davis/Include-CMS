export enum FieldType {
  ShortText = 'shortText',
  LongText = 'longText',
  Date = 'date',
  MediaItem = 'mediaItem',
  MediaList = 'mediaList',
}

export interface Field {
  name: string;
  type: FieldType;
}

export interface Schema {
  name: string;
  fields: Field[];
}

export interface FileItem {
  file: File;
  name: string;
  size: number;
  preview: string;
}
