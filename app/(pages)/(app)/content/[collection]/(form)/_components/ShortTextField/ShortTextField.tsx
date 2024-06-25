'use client';

import { useState } from 'react';

import styles from './ShortTextField.module.scss';

interface ShortTextFieldProps {
  field_name: string;
  placeholder: string;
  initial_value?: string;
}

export default function ShortTextField({
  field_name: _,
  placeholder = 'Short Text Field',
  initial_value = '',
}: ShortTextFieldProps) {
  const [value, setValue] = useState(initial_value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
