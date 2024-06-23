import styles from './ContentSection.module.scss';
import { IoChevronUp } from 'react-icons/io5';

interface ContentSectionProps {
  title: string;
  children: React.ReactNode[];
}

export default function ContentSection({
  title,
  children,
}: ContentSectionProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_left}>
          <h1>{title}</h1>
          <h3>({children.length} items)</h3>
        </div>
        <button className={styles.expand_button}>
          <p className={styles.expand_text}>Collapse View</p>
          <IoChevronUp className={styles.expand_icon} />
        </button>
      </div>
      <div className={styles.cards}>{children}</div>
    </div>
  );
}
