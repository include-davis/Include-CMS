import { FieldType } from './_types';

const Fields: { [key: string]: FieldType } = {
  ShortText: { name: 'shortText', defaultValue: '' },
  LongText: { name: 'longText', defaultValue: '' },
  Date: { name: 'date', defaultValue: '00-00-0000' },
  MediaItem: { name: 'mediaItem', defaultValue: [] },
  MediaList: { name: 'mediaList', defaultValue: [] },
};

export default Fields;
