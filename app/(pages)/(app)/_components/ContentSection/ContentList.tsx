import styles from './ContentList.module.scss';

interface ContentListProps {
  expanded: boolean;
  children: React.ReactNode;
}

export default function ContentList({ expanded, children }: ContentListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.viewport}>
        <div className={`${styles.cards} ${expanded ? styles.expanded : null}`}>
          {children}
        </div>
      </div>
      <div className={styles.controls}>
        {'(<)'} CAROUSEL CONTROLS {'(>)'}
      </div>
    </div>
  );
}
