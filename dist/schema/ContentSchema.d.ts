import { ContentType } from './ContentType';

export class ContentSchema {
  private schema = {};

  constructor(schema = {});

  // Getter to retrieve a ContentType by its key
  public get(key: string): ContentType | undefined;

  // Setter to add or update a ContentType
  public set(key: string, contentType: ContentType): void;

  // Method to get all content types
  public getAll(): { [key: string]: ContentType };
  public getNames(): string[] {
    return Object.keys(this.schema);
  }

  public toJSON();

  public static fromJSON(json: object): ContentSchema;
}
