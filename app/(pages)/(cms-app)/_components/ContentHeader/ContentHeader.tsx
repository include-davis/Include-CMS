import CreateButton from '../../content/_components/CreateButton/CreateButton';
import ContentFilters from '../ContentFilters/ContentFilters';
import ContentSelectButton from '../ContentSelectButton/ContentSelectButton';
import styles from './ContentHeader.module.scss';

interface ContentHeaderProps {
  content_type: string;
}

export default function ContentHeader({ content_type }: ContentHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.top_row}>
        <h1>{content_type}</h1>
        <div className={styles.top_right}>
          <ContentSelectButton />
          <CreateButton content_type={content_type} />
        </div>
      </div>
      <ContentFilters searchPlaceholder={`Search in ${content_type}...`} />
    </div>
  );
}
