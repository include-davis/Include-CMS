'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import schema from '@schema/_index';
import ContentForm from '../_components/ContentForm/ContentForm';
import ContentFormContextProvider from '@contexts/ContentFormContext';
import backButton from '/public/content/form/back-button.png';
import Link from 'next/link';

import { CollectionSchema } from '@typeDefs/content/schema';

interface CreateContentProps {
  params: {
    collection: string;
    id: string;
  };
}

export default function CreateContent({ params }: CreateContentProps) {
  const { collection } = params;
  const collection_schema = (schema as CollectionSchema)[collection];

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
          collection={collection_schema.name.toLowerCase()}
        >
          <ContentForm
            type="Create"
            collection={collection_schema.name.toLowerCase()}
          />
        </ContentFormContextProvider>
      </div>
    </div>
  );
}
