'use client';

import styles from './ShortTextField.module.scss';
import useContentFormContext from '@hooks/useContentFormContext';

interface ShortTextFieldProps {
  field_name: string;
  placeholder: string;
  initial_value?: string;
}

export default function ShortTextField({
  field_name,
  placeholder = 'Short Text Field',
}: ShortTextFieldProps) {
  const { data, updateField } = useContentFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(field_name, event.target.value);
  };

  return (
    <input
      className={styles.input}
      type="text"
      value={data[field_name]}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
