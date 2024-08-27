import styles from './MediaItemField.module.scss';

interface MediaItemFieldProps {
  name: string;
  initial_value?: any;
}

export default function MediaItemField({
  name: _,
  initial_value: __,
}: MediaItemFieldProps) {
  return <div className={styles.container}>MediaItemField</div>;
}
