import ContentType from '@schema/_contentType';

export interface FieldType {
  name: string;
  defaultValue: any;
}

export interface Field {
  name: string;
  type: FieldType;
}

export interface ContentSchema {
  [key: string]: ContentType;
}
