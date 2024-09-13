'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import ContentForm from '../_components/ContentForm/ContentForm';
import ContentFormContextProvider from '@contexts/ContentFormContext';
import backButton from '@public/content/form/back-button.png';
import Link from 'next/link';
import schema from '@app/_utils/schema';

interface CreateContentProps {
  params: {
    content_type: string;
    id: string;
  };
}

export default function CreateContent({ params }: CreateContentProps) {
  const { content_type } = params;
  const contentSchema = schema.get(content_type);

  const generateInitialValue = () => {
    const res: { [key: string]: any } = {};
    for (const field of contentSchema?.getFieldArray() ?? []) {
      res[field.name] = field.defaultValue;
    }
    return res;
  };

  return (
    <div className={styles.container}>
      <Link className={styles.back_button} href={`/content/${content_type}`}>
        <Image
          className={styles.back_icon}
          src={backButton}
          alt="back button"
        />
        <p>{`Back to ${content_type}`}</p>
      </Link>
      <div className={styles.form_container}>
        <ContentFormContextProvider
          content_type={contentSchema?.getName() || ''}
          initialValue={generateInitialValue()}
        >
          <ContentForm
            action="Create"
            content_type={contentSchema?.getName() || ''}
          />
        </ContentFormContextProvider>
      </div>
    </div>
  );
}
