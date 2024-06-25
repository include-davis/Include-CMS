// 'use client';
// import { useState } from 'react';
import styles from './MediaSelector.module.scss';
import MediaFromGallery from './MediaFromGallery';
import MediaFromUpload from './MediaFromUpload';

// interface MediaListSectionProps {
//   setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
// }

interface MediaSelectorProps {
  field_name: string;
}

export default function MediaSelector({ field_name: _ }: MediaSelectorProps) {
  // const [files, setFilesInternal] = useState<FileItem[]>([]);

  // const handleFilesChange = (newFiles: React.SetStateAction<FileItem[]>) => {
  //   if (typeof newFiles === 'function') {
  //     setFilesInternal((prevFiles) => newFiles(prevFiles));
  //     setFiles((prevFiles) => newFiles(prevFiles));
  //   } else {
  //     setFilesInternal(newFiles);
  //     setFiles(newFiles);
  //   }
  // };

  return (
    // <div className={styles.upload_container}>
    //   <h4>Photo gallery</h4>
    //   <MediaList files={files} setFiles={handleFilesChange} />
    //   <div className={styles.add_container}>
    //     <h4>Add Images/Videos</h4>
    <div className={styles.container}>
      <MediaFromUpload />
      <div className={styles.or_container}>
        <div className={styles.line}></div>
        <h4> or </h4>
        <div className={styles.line}></div>
      </div>
      <MediaFromGallery />
    </div>
    //   </div>
    // </div>
  );
}
