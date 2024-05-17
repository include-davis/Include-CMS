import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './DescriptionForm.module.scss';
import {
  FieldType,
  FormSection,
  Field,
  FileItem,
} from '../../../../../../../type';
import Upload from '../Upload/Upload';

const DynamicTextEditor = dynamic(() => import('./TextEditor'), { ssr: false });

interface DynamicFormProps {
  section: FormSection;
  formData: { [key: string]: string | number | FileItem[] };
  onFormDataChange: (
    field: string,
    value: string | number | FileItem[]
  ) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  section,
  onFormDataChange,
}) => {
  const [fieldStates, setFieldStates] = useState<{
    [key: string]: string | number;
  }>({});
  const [mediaGalleryFiles, setMediaGalleryFiles] = useState<FileItem[]>([]);
  if (mediaGalleryFiles.length > 20) {
    console.log('woah');
  }

  useEffect(() => {
    const initialState: { [key: string]: string | number } = {};
    for (const field of section.fields) {
      initialState[field.name] = field.type === FieldType.Date ? '' : '';
    }
    setFieldStates(initialState);
  }, [section.fields]);

  const handleNonMediaChange = (
    fieldName: string,
    value: string | number,
    field: Field
  ) => {
    setFieldStates((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    onFormDataChange(fieldName, value);
    if (field.name === 'Photo Gallery') {
      console.log('something went wrong');
    }
  };

  const handleMediaChange = (
    fieldName: string,
    value: FileItem[] | ((prevState: FileItem[]) => FileItem[]),
    field: Field
  ) => {
    setMediaGalleryFiles((prevState) => {
      if (typeof value === 'function') {
        const updatedValue = (value as (prevState: FileItem[]) => FileItem[])(
          prevState
        );
        onFormDataChange(fieldName, updatedValue);
        return updatedValue;
      } else {
        onFormDataChange(fieldName, value);
        return value;
      }
    });
    const isFieldUsed = field !== null && field !== undefined;
    console.log(isFieldUsed);
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.row_col}>
        {section.fields
          .filter(
            (field) =>
              field.type === FieldType.ShortText ||
              field.type === FieldType.Date
          )
          .map((field) => (
            <div
              key={field.name}
              className={`${styles.input_container} ${
                field.type === FieldType.ShortText ? styles.title_container : ''
              } ${field.type === FieldType.Date ? styles.date_container : ''}`}
            >
              <label htmlFor={field.name}>{field.name}</label>
              {field.type === FieldType.ShortText && (
                <input
                  type="text"
                  id={field.name}
                  value={fieldStates[field.name]}
                  placeholder={`Enter ${field.name}`}
                  onChange={(e) =>
                    handleNonMediaChange(field.name, e.target.value, field)
                  }
                />
              )}
              {field.type === FieldType.Date && (
                <input
                  type="date"
                  id={field.name}
                  value={fieldStates[field.name]}
                  onChange={(e) =>
                    handleNonMediaChange(field.name, e.target.value, field)
                  }
                />
              )}
            </div>
          ))}
      </div>
      {section.fields
        .filter((field) => field.type === FieldType.LongText)
        .map((field) => (
          <div key={field.name} className={styles.input_container}>
            <label htmlFor={field.name}>{field.name}</label>
            <div className={styles.editContainer}>
              <DynamicTextEditor
                initialValue={fieldStates[field.name]}
                onChange={(content: string) =>
                  handleNonMediaChange(field.name, content, field)
                }
              />
            </div>
          </div>
        ))}
      {section.fields
        .filter((field) => field.type === FieldType.MediaList)
        .map((field) => (
          <div key={field.name}>
            <Upload
              setFiles={(value) => handleMediaChange(field.type, value, field)}
            />
          </div>
        ))}
    </div>
  );
};

export default DynamicForm;
