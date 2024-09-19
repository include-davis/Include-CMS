'use client';
import Image from 'next/image';
import styles from './MediaFromGallery.module.scss';
import bookmarkIcon from '@public/content/form/bookmark.png';
import useSelectContext from '@app/(pages)/_hooks/useSelectContext';
import { Fragment } from 'react';
import UploadedMediaPopup from '@components/UploadedMediaPopup/UploadedMediaPopup';

interface MediaFromGalleryProps {
  fieldName: string;
}

export default function MediaFromGallery({ fieldName }: MediaFromGalleryProps) {
  const { toggleSelectMode } = useSelectContext();
  return (
    <Fragment>
      <div className={styles.container} onClick={toggleSelectMode}>
        <Image src={bookmarkIcon} alt="bookmark icon" height={43} width={34} />
        <h4> Choose from Uploaded Media </h4>
      </div>
      <UploadedMediaPopup fieldName={fieldName} />
    </Fragment>
  );
}
