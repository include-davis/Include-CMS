import styles from './CreateButton.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import add from '/public/content/[content_type]/add.svg';

interface CreateButtonProps {
  content_type: string;
}

export default function CreateButton({ content_type }: CreateButtonProps) {
  return (
    <Link
      href={`/content/${content_type.toLowerCase()}/create`}
      className={styles.container}
    >
      <Image src={add} alt={'add icon'} height={14} />
      <h4>Create New Content</h4>
    </Link>
  );
}
