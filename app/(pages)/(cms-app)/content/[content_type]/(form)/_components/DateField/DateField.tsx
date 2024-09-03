'use client';
import useContentFormContext from '@hooks/useContentFormContext';
import styles from './DateField.module.scss';

interface DateFieldProps {
  field_name: string;
}

export default function DateField({ field_name }: DateFieldProps) {
  const { data, updateField } = useContentFormContext();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(field_name, event.target.value);
  };

  return (
    <input
      className={styles.input}
      type="date"
      value={data[field_name] || ''}
      onChange={handleChange}
    />
  );
}
