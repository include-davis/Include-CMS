import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import formConfig from '../../../../../../editor.config';
import { FormSection, FileItem } from '../../../../../../type';
import DynamicForm from './DynamicForm/DynamicForm';
import styles from './EditorPage.module.scss';

interface EditorPageProps {
  collection?: string;
}

interface FormData {
  [key: string]: string | number | FileItem[];
}

const EditorPage: React.FC<EditorPageProps> = ({ collection }) => {
  const [formData, setFormData] = useState<FormData>({});

  const currentSection = collection
    ? formConfig.sections.find(
        (section: FormSection) =>
          section.name.toLowerCase() === collection.toLowerCase()
      )
    : null;

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
      {currentSection ? (
        <>
          <Link
            href={`/content/${currentSection.name}`}
            className={styles.back_button}
          >
            <Image
              src="/index/back-button.png"
              alt="back button"
              height={18}
              width={9}
            />
            Back to {currentSection.name}
          </Link>
          <h1 className={styles.header}> Edit Content </h1>
          <DynamicForm
            key={currentSection.name}
            section={currentSection}
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />
        </>
      ) : (
        <div>Invalid collection</div>
      )}
      <div className={styles.content_button}>
        <div className={styles.draft_button}>Save as draft</div>
        <div className={styles.publish_button}>Publish content</div>
      </div>
    </main>
  );
};

export default EditorPage;
