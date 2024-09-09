import Link from 'next/link';
import styles from './ContentCard.module.scss';
import ContentCardImages from './ContentCardImages';
import schema from '@app/_utils/schema';

import { LuMoreVertical } from 'react-icons/lu';
import BaseContentItem from '@app/_types/content/BaseContentItem';

interface ContentCardInterface {
  content_type: string;
  contentItem: BaseContentItem;
}

export default function ContentCard({
  content_type,
  contentItem,
}: ContentCardInterface) {
  const contentSchema = schema[content_type];
  const mediaItems = contentSchema
    .getFieldArray()
    .filter((field) => field.type === 'mediaList')
    .map((field) => contentItem[field.name])
    .flat();

  return (
    <Link
      href={`/content/${content_type}/edit/${contentItem._id}`}
      className={styles.container}
    >
      <div className={styles.top_row}>
        <h2>{contentItem._name}</h2>
        <button className={styles.kebab_button}>
          <LuMoreVertical className={styles.kebab} />
        </button>
      </div>
      <p className={styles.last_edited}>
        last edited: {contentItem._last_modified}
      </p>
      <ContentCardImages images={mediaItems} />
      <p className={styles.description}>{contentItem._description}</p>
    </Link>
  );
}
