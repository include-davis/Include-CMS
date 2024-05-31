export enum FieldType {
  ShortText = 'shortText',
  LongText = 'longText',
  Date = 'Date',
  MediaList = 'mediaList',
}

export interface Field {
  name: string;
  type: FieldType;
}

export interface FormSection {
  name: string;
  fields: Field[];
}

export interface FormConfig {
  sections: FormSection[];
}

export interface FileItem {
  file: File;
  name: string;
  size: number;
  preview: string;
}
