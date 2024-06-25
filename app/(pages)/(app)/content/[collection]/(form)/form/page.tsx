import styles from './page.module.scss';
import LongTextField from '../_components/LongTextField/LongTextField';
import ShortTextField from '../_components/ShortTextField/ShortTextField';
import DateField from '../_components/DateField/DateField';
import MediaListField from '../_components/MediaListField/MediaListField';

export default function TestPage() {
  return (
    <div className={styles.container}>
      <ShortTextField
        field_name="short-text-field"
        placeholder="Enter Painge"
      />
      <DateField field_name="date-field" />
      <LongTextField field_name="long-text-field" />
      <MediaListField field_name="media-list-field" />
    </div>
  );
}
