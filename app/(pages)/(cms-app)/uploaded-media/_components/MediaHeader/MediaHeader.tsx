'use client';
import ContentFilters from '../../../_components/ContentFilters/ContentFilters';
import useSelectContext from '@hooks/useSelectContext';
import Image from 'next/image';
import { DeleteMediaItem } from '@actions/media/deleteMediaItem';
import styles from './MediaHeader.module.scss';

import trash from '/public/content/[content_type]/trash.svg';

export default function MediaHeader() {
  const { selectMode, toggleSelectMode, selectedIds } = useSelectContext();

  const handleTrash = async () => {
    const deleteIds = Object.entries(selectedIds)
      .map(([id, toDelete]) => (toDelete && id) as string)
      .filter(Boolean);

    if (deleteIds.length === 0) {
      alert('No items selected to trash');
    }

    const res = await Promise.all(deleteIds.map((id) => DeleteMediaItem(id)));
    const ok = res.every(({ ok }) => ok);
    if (ok) {
      alert('Everything worked!');
      toggleSelectMode();
    } else {
      alert('Something went wrong!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top_row}>
        <h1>Uploaded Media</h1>
        <div className={styles.top_right}>
          <button
            className={styles.select_button_container}
            onClick={toggleSelectMode}
          >
            <div className={styles.select_button_icon} />
            <p>Select</p>
          </button>
          {selectMode && (
            <button
              className={styles.trash_button_container}
              onClick={handleTrash}
            >
              <Image
                src={trash}
                alt="trash icon"
                className={styles.trash_button_trash_icon}
              />
              <h4>Trash</h4>
            </button>
          )}
        </div>
      </div>
      <ContentFilters searchPlaceholder={`Search in uploaded media...`} />
    </div>
  );
}
