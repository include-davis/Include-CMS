'use client';

import '@globals/styles/quill.snow.scss';

import { useState } from 'react';

import styles from './LongTextField.module.scss';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface LongTextFieldProps {
  name: string;
  initialValue?: string;
}

export default function LongTextField({
  name: _,
  initialValue = '',
}: LongTextFieldProps) {
  const [value, setValue] = useState<string>(initialValue);

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
