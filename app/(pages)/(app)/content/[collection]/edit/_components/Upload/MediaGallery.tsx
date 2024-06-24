import React from 'react';
import Image from 'next/image';
import styles from './MediaGallery.module.scss';
import { FileItem } from '@configs/_schema/_types';

interface MediaGalleryProps {
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ files, setFiles }) => {
  const [draggedIndex, setDraggedIndex] = React.useState(-1);
  const [newIndex, setNewIndex] = React.useState(-1);
  const [originalOrder, setOriginalOrder] = React.useState<FileItem[]>(files);

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
    e: React.DragEvent<HTMLDivElement>,
    draggedIndex: number
  ) => {
    setDraggedIndex(draggedIndex);
    setOriginalOrder(files);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    overIndex: number
  ) => {
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
      setDraggedIndex(-1);
      setNewIndex(-1);
    } else if (draggedIndex !== -1) {
      setFiles(originalOrder);
      setDraggedIndex(-1);
      setNewIndex(-1);
    }
  };

  return (
    <div className={styles.gallery_container} onDragLeave={handleDragLeave}>
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
              src="/index/drag-icon.png"
              alt="draggable icon"
              width={22}
              height={27}
              className={styles.drag_icon}
            />
            <p className={styles.index}>#{index + 1}</p>
            <Image
              src={file.preview}
              alt={file.name}
              className={styles.image}
              width={120}
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
              onClick={() => handleReplace(index)}
              className={styles.replace}
            >
              Replace Image
            </div>
            <Image
              src="/index/delete.png"
              alt="delete icon"
              height={36}
              width={39}
              onClick={() => handleDelete(index)}
              className={styles.delete}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default MediaGallery;
