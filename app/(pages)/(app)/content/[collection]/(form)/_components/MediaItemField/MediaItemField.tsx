import styles from './MediaItemField.module.scss';

interface MediaItemFieldProps {
  name: string;
  initial_value?: any;
}

export default function MediaItemField({
  name,
  initial_value,
}: MediaItemFieldProps) {
  return <div className={styles.container}>MediaItemField</div>;
}
