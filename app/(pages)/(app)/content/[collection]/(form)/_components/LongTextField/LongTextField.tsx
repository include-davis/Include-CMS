'use client';

import '@globals/styles/quill.snow.scss';

import { useState } from 'react';

import styles from './LongTextField.module.scss';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface LongTextFieldProps {
  field_name: string;
  initial_value?: string;
}

export default function LongTextField({
  field_name: _,
  initial_value = '',
}: LongTextFieldProps) {
  const [value, setValue] = useState<string>(initial_value);

  const handleChange = (content: string) => {
    setValue(content === '<p><br></p>' ? '' : content);
  };

  return (
    <div className={styles.editContainer}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={{
          toolbar: [['bold', 'italic', 'underline', 'strike']],
        }}
      />
      <p>{value}</p>
    </div>
  );
}
