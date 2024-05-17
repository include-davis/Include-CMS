import { FormConfig, FieldType } from './type';

const formConfig: FormConfig = {
    sections: [
      {
        name: 'Weddings',
        fields: [
          { name: 'Title', type: FieldType.ShortText },
          { name: 'Date', type: FieldType.Date },
          { name: 'Description', type: FieldType.LongText },
          { name: 'Photo Gallery', type: FieldType.MediaList },
        ],
      },
      {
        name: 'Films',
        fields: [
          { name: 'Title', type: FieldType.ShortText },
          { name: 'Description', type: FieldType.LongText },
        ],
      },
    ],
  };
  
export default formConfig;
