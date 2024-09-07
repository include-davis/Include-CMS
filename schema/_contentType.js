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

  addField({ displayName, name, required = true, type }) {
    const fieldTypeAttributes = {
      shortText: {
        defaultValue: '',
        isPopulated: Boolean
      },
      longText: {
        defaultValue: '',
        isPopulated: Boolean
      },
      date: {
        defaultValue: '',
        isPopulated: Boolean
      },
      mediaItem: {
        defaultValue: null,
        isPopulated: Boolean,
      },
      mediaList: {
        defaultValue: [],
        isPopulated: (value) => value.length !== 0
      },
    };

    this.fields[name] = {
      type,
      displayName: displayName ?? name,
      defaultValue: fieldTypeAttributes[type].defaultValue,
      required,
      isPopulated: fieldTypeAttributes[type].isPopulated
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
