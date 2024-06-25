'use client';

import { useState } from 'react';

import styles from './DateField.module.scss';

interface DateFieldProps {
  name: string;
  initialValue?: string;
}

export default function DateField({
  name: _,
  initialValue = '',
}: DateFieldProps) {
  const [value, setValue] = useState(initialValue);

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
