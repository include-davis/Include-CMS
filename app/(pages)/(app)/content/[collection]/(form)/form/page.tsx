import styles from './page.module.scss';
import LongTextField from '../_components/LongTextField/LongTextField';
import ShortTextField from '../_components/ShortTextField/ShortTextField';
import DateField from '../_components/DateField/DateField';

export default function TestPage() {
  return (
    <div className={styles.container}>
      <ShortTextField name="short-text-field" placeholder="Enter Painge" />
      <DateField name="date-field" />
      <LongTextField name="long-text-field" />
    </div>
  );
}
