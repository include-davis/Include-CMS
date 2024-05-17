import styles from './DescriptionForm.module.scss';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import '@globals/styles/quill.snow.scss';

interface TextEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (content: string) => {
    setValue(content);
    if (onChange) {
      if (content === '<p><br></p>') {
        onChange('');
      } else {
        onChange(content);
      }
    }
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
    </div>
  );
};

export default TextEditor;
