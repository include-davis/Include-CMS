'use client';
import { useRef, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import styles from './MediaFromUpload.module.scss';

import uploadIcon from '/public/content/form/upload.png';

interface MediaFromUploadProps {
  onInput: (files: FileList) => void;
}

export default function MediaFromUpload({ onInput }: MediaFromUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    onInput(droppedFiles);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    onInput(inputFiles ?? new FileList());
    e.target.value = '';
  };

  const handleDragOver = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={styles.container}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleUploadClick}
    >
      <Image src={uploadIcon} alt="upload icon" height={47} width={47} />
      <h4>
        <u>Upload a File</u> or Drag and Drop
      </h4>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
    </div>
  );
}
