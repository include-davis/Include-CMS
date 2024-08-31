'use client';
import styles from './DynamicFormFields.module.scss';
import useContentFormContext from '@hooks/useContentFormContext';

import schema from '@schema/_index';
import ShortTextField from '../ShortTextField/ShortTextField';
import LongTextField from '../LongTextField/LongTextField';
import DateField from '../DateField/DateField';
import MediaListField from '../MediaListField/MediaListField';
import { Field } from '@typeDefs/content/schema';

import { CollectionSchema } from '@typeDefs/content/schema';

const FieldMapping = {
  shortText: ShortTextField,
  longText: LongTextField,
  date: DateField,
  mediaList: MediaListField,
} as { [_: string]: any };

export default function DynamicFormFields() {
  const { collection } = useContentFormContext();
  const collection_schema = (schema as CollectionSchema)[collection];

  if (!collection_schema) {
    return `Collection: ${collection} does not exist.`;
  }

  return (
    <div className={styles.container}>
      {collection_schema.fields.map((field: Field) => {
        const Field = FieldMapping[field.type.name];
        return (
          <div key={field.name} className={styles.field_container}>
            <label>{field.name}</label>
            <Field field_name={field.name} />
          </div>
        );
      })}
    </div>
  );
}
