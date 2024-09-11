class ContentType {
  constructor({ name, displayName = name }) {
    const baseFields = {
      _name: {
        type: 'shortText',
        displayName: 'Internal name',
        required: true,
        visible: true,
      },
      _description: {
        type: 'shortText',
        displayName: 'Internal description',
        visible: true,
      },
      _published: {
        type: 'boolean',
        defaultValue: false,
        visible: false,
      },
      _created_at: {
        type: 'date',
        visible: false,
      },
      _last_modified: {
        type: 'date',
        visible: false,
      },
    };

    this.name = name;
    this.displayName = displayName;
    this.fields = baseFields;
  }

  addField({
    defaultValue,
    displayName,
    name,
    required = true,
    type,
    visible = true,
  }) {
    const fieldTypeAttributes = {
      shortText: {
        defaultValue: '',
        isPopulated: Boolean,
      },
      longText: {
        defaultValue: '',
        isPopulated: Boolean,
      },
      date: {
        defaultValue: '',
        isPopulated: Boolean,
      },
      mediaItem: {
        defaultValue: null,
        isPopulated: Boolean,
      },
      mediaList: {
        defaultValue: [],
        isPopulated: (value) => value.length !== 0,
      },
      boolean: {
        defaultValue: null,
        isPopulated: (value) => value === null,
      },
    };

    this.fields[name] = {
      type,
      displayName: displayName ?? name,
      defaultValue: defaultValue ?? fieldTypeAttributes[type].defaultValue,
      isPopulated: fieldTypeAttributes[type].isPopulated,
      required,
      visible,
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
