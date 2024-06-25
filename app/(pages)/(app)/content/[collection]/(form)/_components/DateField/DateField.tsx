'use client';

import { useState } from 'react';

import styles from './DateField.module.scss';

interface DateFieldProps {
  field_name: string;
  initial_value?: string;
}

export default function DateField({
  field_name: _,
  initial_value = '',
}: DateFieldProps) {
  const [value, setValue] = useState(initial_value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <input
      className={styles.input}
      type="date"
      value={value}
      onChange={handleChange}
    />
  );
}
