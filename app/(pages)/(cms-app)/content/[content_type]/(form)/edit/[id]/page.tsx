'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import schema from '@app/_utils/schema';
import ContentForm from '@components/ContentForm/ContentForm';
import ContentFormContextProvider from '@contexts/ContentFormContext';
import backButton from '@public/content/form/back-button.png';
import Link from 'next/link';
import useFindContentItem from '@app/(pages)/_hooks/useFindContentItem';

interface CreateContentProps {
  params: {
    content_type: string;
    id: string;
  };
}

export default function EditContent({ params }: CreateContentProps) {
  const { content_type, id } = params;
  const { res, loading } = useFindContentItem(content_type, id);

  if (loading) {
    return 'loading...';
  }

  if (!res.ok) {
    return res.error;
  }

  const contentSchema = schema?.get(content_type);

  const { _id: _, _created_at: __, _last_modified: ___, ...body } = res.body;

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
          id={id}
          initialValue={body}
        >
          <ContentForm
            action="Edit"
            content_type={contentSchema?.getName() || ''}
          />
        </ContentFormContextProvider>
      </div>
    </div>
  );
}
