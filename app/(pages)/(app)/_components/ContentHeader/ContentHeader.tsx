import CreateButton from '../../content/_components/CreateButton/CreateButton';
import ContentFilters from '../ContentFilters/ContentFilters';
import ContentSelectButton from '../ContentSelectButton/ContentSelectButton';
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
          <ContentSelectButton />
          <CreateButton collection={collection} />
        </div>
      </div>
      <ContentFilters searchPlaceholder={`Search in ${collection}...`} />
    </div>
  );
}
