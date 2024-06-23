import styles from './ContentHeader.module.scss';

interface ContentHeaderProps {
  collection: string;
}

export default function ContentHeader({ collection }: ContentHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.top_row}>
        <h1>{collection}</h1>
        <div className={styles.top_right}>
          <div>SELECT BUTTON</div>
          <div>CREATE NEW CONTENT BUTTON</div>
        </div>
      </div>
      <div className={styles.bot_row}>
        <div>SEARCH BAR</div>
        <div>FILTER BY</div>
      </div>
    </div>
  );
}
