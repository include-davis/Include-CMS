'use client';
import styles from './DescriptionForm.module.scss';
import React, { useState } from 'react';
import ReactQuill, { QuillDeltaStatic } from 'react-quill';
import './quill.snow.css';

interface TextEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState<string>(initialValue);
  const [unusedDelta, setUnusedDelta] = useState<QuillDeltaStatic | null>(null);
  const [unusedSource, setUnusedSource] = useState<string | null>(null);
  const [unusedEditor, setUnusedEditor] = useState<unknown | null>(null);

  const handleChange = (
    content: string,
    _delta: QuillDeltaStatic,
    _source: string,
    _editor: unknown
  ) => {
    setValue(content);
    setUnusedDelta(unusedDelta);
    setUnusedDelta(_delta);
    setUnusedSource(unusedSource);
    setUnusedSource(_source);
    setUnusedEditor(unusedEditor);
    setUnusedEditor(_editor);
    if (onChange) {
      onChange(content);
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
