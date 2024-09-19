import styles from './MediaListField.module.scss';

import MediaList from './MediaList';
import MediaSelector from '../MediaSelector/MediaSelector';

interface MediaItemFieldProps {
  field_name: string;
  initial_value?: string[];
}

export default function MediaListField({
  field_name,
  initial_value: _,
}: MediaItemFieldProps) {
  return (
    <div className={styles.container}>
      <MediaList field_name={field_name} />
      <MediaSelector field_name={field_name} />
    </div>
  );
}
