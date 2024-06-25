import styles from './page.module.scss';
import LongTextField from '../_components/LongTextField/LongTextField';
import ShortTextField from '../_components/ShortTextField/ShortTextField';

export default function TestPage() {
  return (
    <div className={styles.container}>
      <ShortTextField name="short-text-field" placeholder="Enter Painge" />
      <LongTextField name="long-text-field" />
    </div>
  );
}
