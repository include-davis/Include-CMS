import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import schema from '@configs/_schema/_index';
import { Schema, FileItem } from '@configs/_schema/_types';
import DynamicForm from './DynamicForm/DynamicForm';

import backButton from '/public/content/edit/back-button.png';
import styles from './EditorPage.module.scss';

interface EditorPageProps {
  collection: string;
}

interface FormData {
  [key: string]: string | number | FileItem[];
}

export default function EditorPage({ collection }: EditorPageProps) {
  const [formData, setFormData] = useState<FormData>({});

  const currentSection = schema.find(
    (section: Schema) => section.name.toLowerCase() === collection.toLowerCase()
  ) as Schema;

  const handleFormDataChange = (
    field: string,
    value: string | number | FileItem[]
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <main>
      <Link
        href={`/content/${currentSection.name.toLowerCase()}`}
        className={styles.back_button}
      >
        <Image src={backButton} alt="back button" height={18} />
        Back to {currentSection.name}
      </Link>
      <h1 className={styles.header}> Edit Content </h1>
      <DynamicForm
        key={currentSection.name}
        section={currentSection}
        formData={formData}
        onFormDataChange={handleFormDataChange}
      />
      <div className={styles.content_button}>
        <div className={styles.draft_button}>Save as draft</div>
        <div className={styles.publish_button}>Publish content</div>
      </div>
    </main>
  );
}
