'use client';
import { useRef, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import styles from './MediaFromUpload.module.scss';
import useContentFormContext from '@hooks/useContentFormContext';

import uploadIcon from '/public/content/edit/upload.png';

interface MediaFromUploadProps {
  field_name: string;
}

export default function MediaFromUpload({ field_name }: MediaFromUploadProps) {
  const { data, updateField } = useContentFormContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    const newFiles = droppedFiles.map((file) => ({
      file,
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file),
    }));
    updateField(field_name, [...data[field_name], ...newFiles]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    if (inputFiles) {
      const newFiles = Array.from(inputFiles).map((file) => ({
        file,
        name: file.name,
        size: file.size,
        preview: URL.createObjectURL(file),
      }));
      updateField(field_name, [...data[field_name], ...newFiles]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
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
