import Link from 'next/link';
import styles from './ContentCard.module.scss';
import ContentCardImages from './ContentCardImages';
import MediaItem from '@app/_types/media/media';

import { LuMoreVertical } from 'react-icons/lu';

interface ContentCardInterface {
  content_type: string;
  _id: string;
  _name: string;
  _description: string;
  last_modified: string;
  preview_media: MediaItem[];
}

export default function ContentCard({
  content_type,
  _id,
  _name,
  _description,
  last_modified,
  preview_media,
}: ContentCardInterface) {
  return (
    <Link
      href={`/content/${content_type}/edit/${_id}`}
      className={styles.container}
    >
      <div className={styles.top_row}>
        <h2>{_name}</h2>
        <button className={styles.kebab_button}>
          <LuMoreVertical className={styles.kebab} />
        </button>
      </div>
      <p className={styles.last_edited}>last edited: {last_modified}</p>
      <ContentCardImages images={preview_media} />
      <p className={styles.description}>{_description}</p>
    </Link>
  );
}
