'use client';
import React, { useState } from 'react';
import styles from './Upload.module.scss';
import UploadFile from './UploadFile';
import MediaGallery from './MediaGallery';
import UploadedMedia from './UploadMedia';
import { FileItem } from '@configs/_schema/_types';

interface UploadProps {
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
}

export default function Upload({ setFiles }: UploadProps) {
  const [files, setFilesInternal] = useState<FileItem[]>([]);

  const handleFilesChange = (newFiles: React.SetStateAction<FileItem[]>) => {
    if (typeof newFiles === 'function') {
      setFilesInternal((prevFiles) => newFiles(prevFiles));
      setFiles((prevFiles) => newFiles(prevFiles));
    } else {
      setFilesInternal(newFiles);
      setFiles(newFiles);
    }
  };

  return (
    <div className={styles.upload_container}>
      <h4>Photo gallery</h4>
      <MediaGallery files={files} setFiles={handleFilesChange} />
      <div className={styles.add_container}>
        <h4>Add Images/Videos</h4>
        <div className={styles.add_media_container}>
          <UploadFile setFiles={handleFilesChange} />
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
