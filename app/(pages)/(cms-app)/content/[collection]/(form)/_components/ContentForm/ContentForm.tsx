'use client';
import styles from './ContentForm.module.scss';

// import useContentFormContext from '@hooks/useContentFormContext';
import DynamicFormFields from '../DynamicFormFields/DynamicFormFields';
import SubmitButtons from '../SubmitButtons/SubmitButtons';

interface ContentFormProps {
  type: string;
  collection: string;
}

export default function ContentForm({ type, collection }: ContentFormProps) {
  // const { data } = useContentFormContext();
  return (
    <div className={styles.container}>
      <h1>
        {type} {collection.toLowerCase()}
      </h1>
      <DynamicFormFields />
      <SubmitButtons submission_type={type} />
    </div>
  );
}
