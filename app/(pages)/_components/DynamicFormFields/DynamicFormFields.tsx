'use client';
import styles from './DynamicFormFields.module.scss';
import useContentFormContext from '@hooks/useContentFormContext';

import schema from '@app/_utils/schema';
import ShortTextField from '../ShortTextField/ShortTextField';
import LongTextField from '../LongTextField/LongTextField';
import DateField from '../DateField/DateField';
import MediaListField from '../MediaListField/MediaListField';
import { Field } from '@dist/index';

const FieldMapping = {
  shortText: ShortTextField,
  longText: LongTextField,
  date: DateField,
  mediaList: MediaListField,
} as { [_: string]: any };

export default function DynamicFormFields() {
  const { content_type } = useContentFormContext();
  const contentSchema = schema.get(content_type);

  if (!contentSchema) {
    return `Content type: ${content_type} does not exist.`;
  }

  return (
    <div className={styles.container}>
      {contentSchema
        .getFieldArray()
        .filter((field: Field) => field.visible)
        .map((field: Field) => {
          const Field = FieldMapping[field.type];
          return (
            <div key={field.name} className={styles.field_container}>
              <label>
                {field.displayName}
                {field.required && (
                  <span className={styles.required_star}> *</span>
                )}
              </label>
              <Field field_name={field.name} />
            </div>
          );
        })}
    </div>
  );
}
