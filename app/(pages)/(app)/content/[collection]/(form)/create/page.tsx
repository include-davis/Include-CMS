'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import schema from '@configs/_schema/_index';
import ContentForm from '../_components/ContentForm/ContentForm';
import ContentFormContextProvider from '@contexts/ContentFormContext';
import backButton from '/public/content/edit/back-button.png';
import Link from 'next/link';

interface CreateContentProps {
  params: {
    collection: string;
    id: string;
  };
}

export default function CreateContent({ params }: CreateContentProps) {
  const { collection } = params;
  const schema_collection = schema[collection];

  return (
    <div className={styles.container}>
      <Link className={styles.back_button} href={`/content/${collection}`}>
        <Image
          className={styles.back_icon}
          src={backButton}
          alt="back button"
        />
        <p>{`Back to ${collection}`}</p>
      </Link>
      <div className={styles.form_container}>
        <ContentFormContextProvider
          collection={schema_collection.name.toLowerCase()}
        >
          <ContentForm
            type="Create"
            collection={schema_collection.name.toLowerCase()}
          />
        </ContentFormContextProvider>
      </div>
    </div>
  );
}
