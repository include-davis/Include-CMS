class ContentType {
  constructor({ name, displayName = name }) {
    const baseFields = {
      _name: {
        type: 'shortText',
        displayName: 'Internal name',
        required: true,
      },
      _description: {
        type: 'shortText',
        displayName: 'Internal description',
        defaultValue: '',
      },
    }

    this.name = name;
    this.displayName = displayName;
    this.fields = baseFields;
  }

  addField({ defaultValue, displayName, name, required = true, type }) {
    const defaults = {
      shortText: '',
      longText: '',
      date: '',
      mediaItem: [],
      mediaList: [],
    };

    this.fields[name] = {
      type,
      displayName: displayName ?? name,
      defaultValue: required ? null : defaultValue || defaults[type],
      required,
    };
    return this;
  }

  getName() {
    return this.name;
  }

  getDisplayName() {
    return this.displayName;
  }

  getFields() {
    return this.fields;
  }

  getFieldArray() {
    const fieldNames = Object.keys(this.fields);
    return fieldNames.map((fieldName) => ({
      name: fieldName,
      ...this.fields[fieldName],
    }));
  }
}

module.exports = ContentType;
