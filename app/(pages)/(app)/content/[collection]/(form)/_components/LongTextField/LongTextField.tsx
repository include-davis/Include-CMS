import styles from './DescriptionForm.module.scss';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import '@globals/styles/quill.snow.scss';

interface TextEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

export default function TextEditor({
  initialValue,
  onChange,
}: TextEditorProps) {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setValue(initialValue === '<p><br></p>' ? '' : initialValue);
  }, [initialValue]);

  const handleChange = (content: string) => {
    setValue(content);
    if (onChange) {
      if (content === '<p><br></p>') {
        onChange(' ');
      } else {
        onChange(content);
      }
    }
  };

  console.log(value);

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
    </div>
  );
}
