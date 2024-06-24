import styles from './CreateButton.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import add from '/public/content/[collection]/add.svg';

interface CreateButtonProps {
  collection: string;
}

export default function CreateButton({ collection }: CreateButtonProps) {
  return (
    <Link
      href={`/content/${collection.toLowerCase()}/create`}
      className={styles.container}
    >
      <Image src={add} alt={'add icon'} height={14} />
      <h4>Create New Content</h4>
    </Link>
  );
}
