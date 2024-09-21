'use client';

import '@globals/styles/quill.snow.scss';

import styles from './LongTextField.module.scss';
import dynamic from 'next/dynamic';
import useContentFormContext from '@hooks/useContentFormContext';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface LongTextFieldProps {
  field_name: string;
  initial_value?: string;
}

export default function LongTextField({ field_name }: LongTextFieldProps) {
  const { data, updateField } = useContentFormContext();

  const handleChange = (content: string) => {
    updateField(field_name, content === '<p><br></p>' ? '' : content);
  };

  return (
    <div className={styles.editContainer}>
      <ReactQuill
        theme="snow"
        value={data[field_name] || ''}
        onChange={handleChange}
        modules={{
          toolbar: [
            { list: 'ordered' },
            { list: 'bullet' },
            'bold',
            'italic',
            'underline',
            'link',
          ],
        }}
      />
    </div>
  );
}
