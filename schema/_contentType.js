class ContentType {
  constructor({ name, displayName = name }) {
    this.name = name;
    this.displayName = displayName;
    this.preview_media_field = null;
    this.fields = {};
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
    return this.getDisplayName;
  }

  getFields() {
    return this.fields;
  }

  getPreviewMediaField() {
    return this.preview_media_field;
  }

  setPreviewMediaField(field_name) {
    this.preview_media_field = field_name;
    return this;
  }
}

module.exports = ContentType;
