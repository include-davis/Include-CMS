'use client';

import useSelectContext from '@hooks/useSelectContext';
import styles from './ContentSelectButton.module.scss';

export default function ContentSelectButton() {
  const { toggleSelectMode } = useSelectContext();

  return (
    <button className={styles.container} onClick={toggleSelectMode}>
      <div className={styles.icon} />
      <p>Select</p>
    </button>
  );
}
