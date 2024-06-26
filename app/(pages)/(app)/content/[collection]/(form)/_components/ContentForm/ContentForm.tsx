'use client';
import styles from './ContentForm.module.scss';

import useContentFormContext from '@hooks/useContentFormContext';
import DynamicFormFields from '../DynamicFormFields/DynamicFormFields';

interface ContentFormProps {
  type: string;
  collection: string;
}

export default function ContentForm({ type, collection }: ContentFormProps) {
  const { data } = useContentFormContext();
  return (
    <div className={styles.container}>
      <p>{JSON.stringify(data)}</p>
      <br />
      <h1>
        {type} {collection.toLowerCase()}
      </h1>
      <DynamicFormFields />
      <div>
        <button>Save Draft</button>
        <button>Publish Draft</button>
      </div>
    </div>
  );
}
