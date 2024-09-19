'use client';
import CreateButton from '@components/CreateButton/CreateButton';
import TrashButton from '@components/TrashButton/TrashButton';
import ContentFilters from '../ContentFilters/ContentFilters';
import ContentSelectButton from '../ContentSelectButton/ContentSelectButton';
import styles from './ContentHeader.module.scss';
import useSelectContext from '@hooks/useSelectContext';

interface ContentHeaderProps {
  content_type: string;
  contentDisplayName: string;
}

export default function ContentHeader({
  content_type,
  contentDisplayName,
}: ContentHeaderProps) {
  const { selectMode } = useSelectContext();
  return (
    <div className={styles.container}>
      <div className={styles.top_row}>
        <h1>{contentDisplayName}</h1>
        <div className={styles.top_right}>
          <ContentSelectButton />
          {selectMode ? (
            <TrashButton content_type={content_type} />
          ) : (
            <CreateButton content_type={content_type} />
          )}
        </div>
      </div>
      <ContentFilters searchPlaceholder={`Search in ${content_type}...`} />
    </div>
  );
}
