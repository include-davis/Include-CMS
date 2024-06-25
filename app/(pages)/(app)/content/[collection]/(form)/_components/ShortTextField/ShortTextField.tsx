'use client';

import { useState } from 'react';

import styles from './ShortTextField.module.scss';

interface ShortTextFieldProps {
  name: string;
  placeholder: string;
  initialValue?: string;
}

export default function ShortTextField({
  name: _,
  placeholder = 'Short Text Field',
  initialValue = '',
}: ShortTextFieldProps) {
  const [value, setValue] = useState(initialValue);

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
