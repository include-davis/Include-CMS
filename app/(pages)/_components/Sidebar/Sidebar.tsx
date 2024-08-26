'use client';
import styles from './Sidebar.module.scss';
import Image from 'next/image';
import logo from '/public/navigation/sidebar/logo.png';
import settingsIcon from '/public/navigation/sidebar/settings-icon.png';
import uploadedMediaIcon from '/public/navigation/sidebar/uploaded-media-icon.png';
import contentIcon from '/public/navigation/sidebar/content-icon.png';

import schema from '@schema/_index';
import SidebarDropdown from './SidebarDropdown';
import SidebarContextProvider from '@contexts/SidebarContext';
import { CollectionSchema } from '@datatypes/schema';

export default function Sidebar() {
  const collection_types = Object.keys(schema);
  const collection_schema = schema as CollectionSchema;
  const collections = collection_types.map((key: string) => ({
    name: collection_schema[key].name,
    url: `/content/${collection_schema[key].name.toLowerCase()}`,
  }));

  const uploaded_media = collection_types.map((key: string) => ({
    name: collection_schema[key].name,
    url: `/uploaded-media/${collection_schema[key].name.toLowerCase()}`,
  }));

  return (
    <SidebarContextProvider>
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
              slug="/content"
              links={collections}
            />
            <SidebarDropdown
              icon={contentIcon}
              name={'Uploaded Media'}
              slug="/uploaded-media"
              links={uploaded_media}
            />
          </div>
          <button className={styles.settings}>
            <Image src={settingsIcon} alt="settings icon" width={20} />
            <h3>Settings</h3>
          </button>
        </div>
      </div>
    </SidebarContextProvider>
  );
}
