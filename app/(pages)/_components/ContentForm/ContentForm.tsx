'use client';
import styles from './ContentForm.module.scss';
import DynamicFormFields from '../DynamicFormFields/DynamicFormFields';
import SubmitButtons from '../SubmitButtons/SubmitButtons';

interface ContentFormProps {
  action: string;
  content_type: string;
}

export default function ContentForm({
  action,
  content_type,
}: ContentFormProps) {
  return (
    <div className={styles.container}>
      <h1>
        {action} {content_type}
      </h1>
      <DynamicFormFields />
      <SubmitButtons action={action} />
    </div>
  );
}
