'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './Upload.module.scss';
import { FileItem } from '../../../../../../../type';

interface UploadFileProps {
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
}

const UploadFile: React.FC<UploadFileProps> = ({ setFiles }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={styles.drop_container}
        onClick={handleUploadClick}
      >
        <Image
          src="/index/upload.png"
          alt="upload icon"
          height={47}
          width={47}
        />
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
    </div>
  );
};

export default UploadFile;
