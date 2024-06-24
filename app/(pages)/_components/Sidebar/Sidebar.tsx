'use client';
import styles from './Sidebar.module.scss';
import Image from 'next/image';
import logo from '/public/navigation/sidebar/logo.png';
import settingsIcon from '/public/navigation/sidebar/settings-icon.png';
import uploadedMediaIcon from '/public/navigation/sidebar/uploaded-media-icon.png';
import contentIcon from '/public/navigation/sidebar/content-icon.png';

import schema from '@configs/_schema/_index';
import { Schema } from '@configs/_schema/_types';
import SidebarDropdown from './SidebarDropdown';

export default function Sidebar() {
  const collections = schema.map((collection: Schema) => ({
    name: collection.name,
    url: `/content/${collection.name.toLowerCase()}`,
  }));

  const uploaded_media = schema.map((collection: Schema) => ({
    name: collection.name,
    url: `/uploaded-media/${collection.name.toLowerCase()}`,
  }));

  return (
    <div className={styles.container}>
      <button className={styles.header}>
        <Image src={logo} alt="include logo" height={30} />
        <h3>ICMS</h3>
      </button>
      <div className={styles.sidebar_contents}>
        <div className={styles.dropdowns}>
          <SidebarDropdown
            icon={uploadedMediaIcon}
            name={'Content'}
            links={collections}
          />
          <SidebarDropdown
            icon={contentIcon}
            name={'Uploaded Media'}
            links={uploaded_media}
          />
        </div>
        <button className={styles.settings}>
          <Image src={settingsIcon} alt="settings icon" width={20} />
          <h3>Settings</h3>
        </button>
      </div>
    </div>
  );
}
