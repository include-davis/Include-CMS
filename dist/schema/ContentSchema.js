// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ContentType } = require('./ContentType');

class ContentSchema {
  constructor(schema = {}) {
    this.schema = schema;
  }

  // Getter to retrieve a ContentType by its key
  get(key) {
    return this.schema[key];
  }

  // Setter to add or update a ContentType
  set(key, contentType) {
    this.schema[key] = contentType;
  }

  // Method to get all content types
  getAll() {
    return this.schema;
  }

  getNames() {
    return Object.keys(this.schema);
  }

  toJSON() {
    return {
      schema: Object.fromEntries(
        Object.entries(this.schema).map(([key, value]) => [key, value.toJSON()])
      ),
    };
  }

  static fromJSON(json) {
    const schema = new ContentSchema();
    Object.entries(json.schema).forEach(([key, value]) => {
      const contentType = ContentType.fromJSON(value);
      schema.set(key, contentType);
    });

    return schema;
  }
}

module.exports = { ContentSchema };
