'use client';
import { useState } from 'react';
import styles from './ContentSection.module.scss';
import { IoChevronUp } from 'react-icons/io5';
import ContentList from './ContentList';

interface ContentSectionProps {
  title: string;
  children: React.ReactNode[];
}

export default function ContentSection({
  title,
  children,
}: ContentSectionProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_left}>
          <h1>{title}</h1>
          <h3>({children.length} items)</h3>
        </div>
        <button
          className={styles.expand_button}
          onClick={() => setExpanded((prev) => !prev)}
        >
          <p className={styles.expand_text}>
            {expanded ? 'Collapse View' : 'Expand View'}
          </p>
          <IoChevronUp
            className={`${styles.expand_icon} ${
              expanded ? styles.expanded : ''
            }`}
          />
        </button>
      </div>
      <ContentList expanded={expanded}>{children}</ContentList>
    </div>
  );
}
