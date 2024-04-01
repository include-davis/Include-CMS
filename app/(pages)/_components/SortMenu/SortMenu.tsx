'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './SortMenu.module.scss';

interface Props {
  updater: (sortBy: string) => void;
  sortBy: string;
}

const SortMenu: React.FC<Props> = ({ updater, sortBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  sortBy;
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = (sortBy: string) => {
    setIsOpen(false);
    updater(sortBy);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sort_container} onClick={toggleMenu}>
        <p>Filter By</p>
        <div className={styles.chevron}>
          <Image src="/index/chevron.png" alt="chevron" width={10} height={5} />
        </div>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          <div
            className={styles.sort_option}
            onClick={() => handleSort('alphabetical')}
          >
            <p> Alphabetically </p>
          </div>
          <div
            className={styles.sort_option}
            onClick={() => handleSort('date')}
          >
            <p> Date </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortMenu;
