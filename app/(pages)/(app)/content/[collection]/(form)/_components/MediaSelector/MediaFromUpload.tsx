'use client';
import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import styles from './MediaFromUpload.module.scss';

import uploadIcon from '/public/content/edit/upload.png';

interface FileItem {
  file: File;
  name: string;
  size: number;
  preview: string;
}

export default function MediaFromUpload() {
  const [_, setFiles] = useState<FileItem[]>([]);

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
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
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
