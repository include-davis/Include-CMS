'use client';

import styles from './SubmitButtons.module.scss';
import useContentFormContext from '@hooks/useContentFormContext';
import { CreateContentItem } from '@actions/content/createContentItem';
import { UpdateContentItem } from '@actions/content/updateContentItems';

interface SubmitButtonsProps {
  action: string;
}

export default function SubmitButtons({ action }: SubmitButtonsProps) {
  const { content_type, id, data } = useContentFormContext();

  const updateContentItem = async () => {
    const res = await UpdateContentItem(content_type, id ?? '', { $set: data });
    if (res.ok) {
      alert('It worked!');
    } else {
      alert(res.error);
    }
  };

  const createContentItem = async () => {
    const res = await CreateContentItem(content_type, data);
    if (res.ok) {
      alert('It worked!');
    } else {
      alert(res.error);
    }
  };

  const saveAction =
    action === 'Create' ? createContentItem : updateContentItem;

  return (
    <div className={styles.container}>
      <button className={styles.save_button} onClick={saveAction}>
        Save Draft
      </button>
      <button className={styles.publish_button}>Publish Draft</button>
    </div>
  );
}
