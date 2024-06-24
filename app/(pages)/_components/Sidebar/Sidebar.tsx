'use client';
import styles from './Sidebar.module.scss';
import Image from 'next/image';
import logo from '/public/navigation/sidebar/logo.png';
import settingsIcon from '/public/navigation/sidebar/settings-icon.png';

import schema from '@configs/_schema/_index';
import { Schema } from '@configs/_schema/_types';

export default function Sidebar() {
  const collections = schema.map((collection: Schema) => collection.name);

  return (
    <div className={styles.container}>
      <button className={styles.header}>
        <Image src={logo} alt="include logo" height={30} />
        <h3>ICMS</h3>
      </button>
      <div className={styles.sidebar_contents}>
        <div className={styles.dropdowns}>hello</div>
        <button className={styles.settings}>
          <Image src={settingsIcon} alt="settings icon" width={20} />
          <h3>Settings</h3>
        </button>
      </div>
    </div>
  );
}
