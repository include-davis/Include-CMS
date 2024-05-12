'use client';
import React, { useState } from 'react';
import styles from './Upload.module.scss';
import UploadFile from './UploadFile';
import MediaGallery from './MediaGallery';
import UploadedMedia from './UploadMedia';

export default function Upload() {
  const [files, setFiles] = useState<
    { file: File; name: string; size: number; preview: string }[]
  >([]);

  return (
    <div className={styles.upload_container}>
      <h4>Photo gallery</h4>
      <MediaGallery files={files} setFiles={setFiles} />
      <div className={styles.add_container}>
        <h4>Add Images/Videos</h4>
        <div className={styles.add_media_container}>
          <UploadFile setFiles={setFiles} />
          <div className={styles.or_container}>
            <div className={styles.line}></div>
            <h4> or </h4>
            <div className={styles.line}></div>
          </div>
          <UploadedMedia />
        </div>
      </div>
    </div>
  );
}
