export interface FieldType {
  name: string;
  defaultValue: any;
}

export interface Field {
  name: string;
  type: FieldType;
}

export interface Schema {
  name: string;
  fields: Field[];
}

export interface CollectionSchema {
  [key: string]: Schema;
}
