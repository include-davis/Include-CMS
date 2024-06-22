import React from 'react';
import styles from './CreateNew.module.scss';
import Link from 'next/link';

const CreateNew: React.FC = () => {
  return (
    <div className={styles.container}>
      <Link href="/your-page-url">
        <p className={styles.create_new}>+ Create New Content</p>
      </Link>
    </div>
  );
};

export default CreateNew;
