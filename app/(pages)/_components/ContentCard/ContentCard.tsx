'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ContentCard.module.scss';
import ContentCardImages from './ContentCardImages';
import schema from '@app/_utils/schema';

import BaseContentItem from '@app/_types/content/BaseContentItem';
import useSelectContext from '@hooks/useSelectContext';
import checkMark from '@public/content/[content_type]/check.svg';
import { FieldType, Field } from '@dist/index';

interface ContentCardInterface {
  content_type: string;
  contentItem: BaseContentItem;
}

export default function ContentCard({
  content_type,
  contentItem,
}: ContentCardInterface) {
  const { selectedIds, toggleId, selectMode } = useSelectContext();

  const contentSchema = schema?.get(content_type);
  const mediaItems = (contentSchema?.getFieldArray() || [])
    .filter((field: Field) => field.type === FieldType.MEDIA_LIST)
    .map((field: Field) => contentItem[field.name])
    .flat();

  const getDateString = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const cardContent = (
    <div className={styles.container} onClick={() => toggleId(contentItem._id)}>
      <div className={styles.top_row}>
        {selectMode && (
          <div className={styles.checkbox_container}>
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
        last edited: {getDateString(contentItem._last_modified)}
      </p>
      <ContentCardImages images={mediaItems} />
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
