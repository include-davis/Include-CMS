const FieldType = {
  SHORT_TEXT: 'shortText',
  LONG_TEXT: 'longText',
  DATE: 'date',
  BOOLEAN: 'boolean',
  MEDIA_LIST: 'mediaList',
};

const FieldTypeAttributes = {
  [FieldType.SHORT_TEXT]: {
    defaultValue: '',
    isPopulated: Boolean,
  },
  [FieldType.LONG_TEXT]: {
    defaultValue: '',
    isPopulated: Boolean,
  },
  [FieldType.DATE]: {
    defaultValue: '',
    isPopulated: Boolean,
  },
  [FieldType.MEDIA_LIST]: {
    defaultValue: [],
    isPopulated: (value) => value.length !== 0,
  },
  [FieldType.BOOLEAN]: {
    defaultValue: null,
    isPopulated: (value) => value === null,
  },
};

const baseFields = {
  _name: {
    name: '_name',
    type: FieldType.SHORT_TEXT,
    displayName: 'Internal name',
    required: true,
    visible: true,
  },
  _published: {
    name: '_published',
    type: FieldType.BOOLEAN,
    defaultValue: false,
    visible: false,
  },
  _created_at: {
    name: '_created_at',
    type: FieldType.DATE,
    visible: false,
  },
  _last_modified: {
    name: '_last_modified',
    type: FieldType.DATE,
    visible: false,
  },
};

class ContentType {
  constructor({
    name,
    singularDisplayName = name,
    pluralDisplayName = singularDisplayName,
  }) {
    this.name = name;
    this.singularDisplayName = singularDisplayName;
    this.pluralDisplayName = pluralDisplayName;
    this.fields = JSON.parse(JSON.stringify(baseFields));
  }

  createField({
    name,
    displayName,
    type,
    required = false,
    visible = true,
    defaultValue,
    isPopulated,
  }) {
    this.fields[name || ''] = {
      name: name || '',
      displayName: displayName ?? name,
      type: type,
      required: Boolean(required),
      visible: Boolean(visible),
      defaultValue: defaultValue ?? FieldTypeAttributes[type].defaultValue,
      isPopulated: isPopulated ?? Boolean,
    };

    return this;
  }

  getName() {
    return this.name;
  }

  getSingularDisplayName() {
    return this.singularDisplayName;
  }

  getPluralDisplayName() {
    return this.pluralDisplayName;
  }

  getField(fieldName) {
    return this.fields[fieldName];
  }

  getFieldNames() {
    return Object.keys(this.fields);
  }

  getFieldArray() {
    return Object.values(this.fields);
  }

  setFields(fields) {
    this.fields = fields;
  }

  toJSON() {
    return {
      name: this.name,
      singularDisplayName: this.singularDisplayName,
      pluralDisplayName: this.pluralDisplayName,
      fields: this.fields,
    };
  }

  static fromJSON(json) {
    const contentType = new ContentType({
      name: json.name,
      singularDisplayName: json.singularDisplayName,
      pluralDisplayName: json.pluralDisplayName,
    });
    contentType.setFields(json.fields);
    return contentType;
  }
}

module.exports = {
  ContentType,
  FieldType,
};
