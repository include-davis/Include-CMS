'use client';
import styles from './DescriptionForm.module.scss';
import React, { useState } from 'react';
import TextEditor from './TextEditor';

const DescriptionForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleDescriptionChange = (content: string) => {
    setDescription(content);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      title,
      date,
      description,
    };
    console.log(formData);
  };

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <div className={styles.row_col}>
        <div className={`${styles.input_container} ${styles.title_container}`}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Give your new content a witty name!"
            onChange={handleTitleChange}
          />
        </div>
        <div className={`${styles.input_container} ${styles.date_container}`}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <div className={styles.input_container}>
        <label htmlFor="description">Description</label>
        <TextEditor
          initialValue={description}
          onChange={handleDescriptionChange}
        />
      </div>
    </form>
  );
};

export default DescriptionForm;
