export interface Field {
  name: string;
  displayName?: string;
  type: FieldType;
  required?: boolean;
  visible: boolean;
  defaultValue?: any;
  isPopulated?: (value: any) => boolean;
}

export const FieldType = {
  SHORT_TEXT: 'shortText',
  LONG_TEXT: 'longText',
  DATE: 'date',
  BOOLEAN: 'boolean',
  MEDIA_LIST: 'mediaList',
};

export class ContentType {
  private name: string;
  private singularDisplayName: string;
  private pluralDisplayName: string;
  private fields: { [key: string]: Field } = {};

  constructor({
    name,
    singularDisplayName = name,
    pluralDisplayName = singularDisplayName,
  }: {
    name: string;
    singularDisplayName?: string;
    pluralDisplayName?: string;
  });

  public createField({
    name,
    displayName,
    type,
    required = false,
    visible = true,
    defaultValue,
    isPopulated,
  }: Field);

  public getName();
  public getSingularDisplayName();
  public getPluralDisplayName();
  public getField(fieldName: string);
  public getFieldNames();
  public getFieldArray();
  public setFields(fields: { [key: string]: Field });
  public toJSON();
  public static fromJSON(json: object): ContentType;
}
