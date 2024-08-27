'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import schema from '@schema/_index';
import ContentForm from '../../_components/ContentForm/ContentForm';
import ContentFormContextProvider from '@contexts/ContentFormContext';
import useContent from '@hooks/useContent';
import backButton from '/public/content/form/back-button.png';
import Link from 'next/link';

import { CollectionSchema } from '@datatypes/schema';

interface CreateContentProps {
  params: {
    collection: string;
    id: string;
  };
}

export default function CreateContent({ params }: CreateContentProps) {
  const { collection, id } = params;
  const collection_schema = (schema as CollectionSchema)[collection];

  const { data, loading } = useContent(collection, id);

  if (loading) {
    return 'loading...';
  }

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
          initialValue={data}
        >
          <ContentForm
            type="Edit"
            collection={collection_schema.name.toLowerCase()}
          />
        </ContentFormContextProvider>
      </div>
    </div>
  );
}
