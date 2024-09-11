'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ContentCard.module.scss';
import ContentCardImages from './ContentCardImages';
import schema from '@app/_utils/schema';

import BaseContentItem from '@app/_types/content/BaseContentItem';
import useSelectContext from '@hooks/useSelectContext';
import checkMark from '/public/content/[content_type]/check.svg';

interface ContentCardInterface {
  content_type: string;
  contentItem: BaseContentItem;
}

export default function ContentCard({
  content_type,
  contentItem,
}: ContentCardInterface) {
  const { selectedIds, toggleId, selectMode } = useSelectContext();

  const contentSchema = schema[content_type];
  const mediaItems = contentSchema
    .getFieldArray()
    .filter((field) => field.type === 'mediaList')
    .map((field) => contentItem[field.name])
    .flat();

  const cardContent = (
    <div className={styles.container}>
      <div className={styles.top_row}>
        {selectMode && (
          <div
            className={styles.checkbox_container}
            onClick={() => toggleId(contentItem._id)}
          >
            {selectedIds[contentItem._id] && (
              <div className={styles.checkbox_internals}>
                <Image src={checkMark} alt="checkmark" fill sizes="30px" />
              </div>
            )}
          </div>
        )}
        <h2 className={styles.item_name}>{contentItem._name}</h2>
      </div>
      <p className={styles.last_edited}>
        last edited: {contentItem._last_modified}
      </p>
      <ContentCardImages images={mediaItems} />
      <p className={styles.description}>{contentItem._description}</p>
    </div>
  );

  return selectMode ? (
    cardContent
  ) : (
    <Link href={`/content/${content_type}/edit/${contentItem._id}`}>
      {cardContent}
    </Link>
  );
}
