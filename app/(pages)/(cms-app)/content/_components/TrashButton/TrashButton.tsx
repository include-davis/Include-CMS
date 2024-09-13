import styles from './TrashButton.module.scss';
import Image from 'next/image';
import useSelectContext from '@hooks/useSelectContext';
import { DeleteContentItem } from '@actions/content/deleteContentItem';

import trash from '@public/content/[content_type]/trash.svg';

interface CreateButtonProps {
  content_type: string;
}

export default function TrashButton({ content_type }: CreateButtonProps) {
  const { selectedIds, toggleSelectMode } = useSelectContext();
  const handleTrash = async () => {
    const deleteIds = Object.entries(selectedIds)
      .map(([id, toDelete]) => (toDelete && id) as string)
      .filter(Boolean);

    if (deleteIds.length === 0) {
      alert('No items selected to trash');
    }

    const res = await Promise.all(
      deleteIds.map((id) => DeleteContentItem(content_type, id))
    );

    const ok = res.every(({ ok }) => ok);
    if (ok) {
      alert('Everything worked!');
      toggleSelectMode();
    } else {
      alert('Something went wrong!');
    }
  };
  return (
    <button className={styles.container} onClick={handleTrash}>
      <Image src={trash} alt="trash icon" className={styles.trash_icon} />
      <h4>Trash</h4>
    </button>
  );
}
