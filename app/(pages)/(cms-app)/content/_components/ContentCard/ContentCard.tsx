import Link from 'next/link';
import styles from './ContentCard.module.scss';
import ContentCardImages from './ContentCardImages';

import { LuMoreVertical } from 'react-icons/lu';

interface ContentCardInterface {
  id: string;
  name: string;
  last_edited: string;
  images: {
    url: string;
    alt: string;
  }[];
  description: string;
  collection: string;
}

export default function ContentCard({
  id,
  name,
  last_edited,
  images,
  description,
  collection,
}: ContentCardInterface) {
  return (
    <Link
      href={`/content/${collection}/edit/${id}`}
      className={styles.container}
    >
      <div className={styles.top_row}>
        <h2>{name}</h2>
        <button className={styles.kebab_button}>
          <LuMoreVertical className={styles.kebab} />
        </button>
      </div>
      <p className={styles.last_edited}>last edited: {last_edited}</p>
      <ContentCardImages images={images} />
      <p className={styles.description}>{description}</p>
    </Link>
  );
}
