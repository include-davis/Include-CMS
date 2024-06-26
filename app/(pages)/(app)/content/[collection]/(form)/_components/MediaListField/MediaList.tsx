'use client';
import { useState, DragEvent } from 'react';
import Image from 'next/image';
import styles from './MediaList.module.scss';
import dragIcon from '/public/content/edit/drag-icon.png';
import deleteIcon from '/public/content/edit/delete.png';

interface FileItem {
  file: File;
  name: string;
  size: number;
  preview: string;
}

export default function MediaList() {
  const [files, setFiles] = useState<FileItem[]>([]);

  const [draggedIndex, setDraggedIndex] = useState(-1);
  const [newIndex, setNewIndex] = useState(-1);
  const [originalOrder, setOriginalOrder] = useState<FileItem[]>(files);

  const formatFileSize = (size: number) => {
    if (size === 0) return '0 Bytes';
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const unitIndex = Math.floor(Math.log(size) / Math.log(1024));
    const unitValue = Math.pow(1024, unitIndex);
    const unitLabel = units[unitIndex];
    const formattedSize = (size / unitValue).toFixed(unitIndex === 0 ? 0 : 2);
    return `${formattedSize} ${unitLabel}`;
  };

  const handleDelete = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setOriginalOrder(updatedFiles);
  };

  const handleReplace = (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (e) => {
      const newFile = (e.target as HTMLInputElement).files?.[0];
      if (newFile) {
        const updatedFiles = [...files];
        const updatedFile = {
          file: newFile,
          name: newFile.name,
          size: newFile.size,
          preview: URL.createObjectURL(newFile),
        };
        updatedFiles[index] = updatedFile;
        setFiles(updatedFiles);
        setOriginalOrder(updatedFiles);
      }
    });
    input.click();
  };

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    draggedIndex: number
  ) => {
    setDraggedIndex(draggedIndex);
    setOriginalOrder(files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, overIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== -1 && draggedIndex !== overIndex) {
      setNewIndex(overIndex);
    }
  };

  const handleDragLeave = () => {
    setNewIndex(-1);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== -1 && newIndex !== -1) {
      const updatedFiles = [...files];
      const [draggedItem] = updatedFiles.splice(draggedIndex, 1);
      updatedFiles.splice(newIndex, 0, draggedItem);
      setFiles(updatedFiles);
    } else if (draggedIndex !== -1) {
      setFiles(originalOrder);
    }
    setDraggedIndex(-1);
    setNewIndex(-1);
  };

  return (
    <div className={styles.container} onDragLeave={handleDragLeave}>
      {files.length === 0 ? (
        <div>No images/videos uploaded yet</div>
      ) : (
        files.map((file, index) => (
          <div
            key={index}
            className={`${styles.card_container} ${
              index === 0 ? styles.cover : ''
            } ${draggedIndex === index ? styles.dragging : ''} ${
              newIndex === index ? styles.dragover : ''
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <Image
              src={dragIcon}
              alt="draggable icon"
              height={27}
              className={styles.drag_icon}
            />
            <p className={styles.index}>#{index + 1}</p>
            <Image
              src={file.preview}
              alt={file.name}
              className={styles.image}
              height={80}
            />
            <p className={styles.name}>{file.name}</p>
            {index === 0 ? (
              <div className={styles.cover_image}>Cover Image</div>
            ) : (
              <div className={styles.uncover_image}></div>
            )}
            <p className={styles.size}>{formatFileSize(file.size)}</p>
            <div
              className={styles.replace}
              onClick={() => handleReplace(index)}
            >
              Replace Image
            </div>
            <Image
              className={styles.delete}
              src={deleteIcon}
              alt="delete icon"
              height={36}
              onClick={() => handleDelete(index)}
            />
          </div>
        ))
      )}
    </div>
  );
}
