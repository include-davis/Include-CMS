'use client';

import styles from './SubmitButtons.module.scss';
import useContentFormContext from '@hooks/useContentFormContext';
import { CreateContentItem } from '@actions/content/createContentItem';
import { UpdateContentItem } from '@actions/content/updateContentItems';
import processFormData from '../../_utils/processFormData';

import HttpError from '@app/(api)/_utils/response/HttpError';

interface SubmitButtonsProps {
  action: string;
}

export default function SubmitButtons({ action }: SubmitButtonsProps) {
  const { content_type, id, data, setData, updateField } =
    useContentFormContext();

  const updateContentItem = async () => {
    try {
      const [clientDataValue, serverDataValue, uploadSuccess] =
        await processFormData(content_type, data);
      setData(clientDataValue);
      if (!uploadSuccess) {
        throw new Error('Not all uploads were successful');
      }
      const res = await UpdateContentItem(content_type, id ?? '', {
        $set: serverDataValue,
      });
      if (!res.ok) {
        throw new Error(res.error);
      }
      alert('Everything worked!');
    } catch (e) {
      const err = e as HttpError;
      alert(err.message);
    }
  };

  const createContentItem = async () => {
    try {
      const [clientDataValue, serverDataValue, uploadSuccess] =
        await processFormData(content_type, data);
      setData(clientDataValue);
      if (!uploadSuccess) {
        throw new Error('Not all uploads were successful');
      }
      const res = await CreateContentItem(
        content_type,
        serverDataValue as object
      );
      if (!res.ok) {
        throw new Error(res.error);
      }
      alert('Everything worked!');
    } catch (e) {
      const err = e as HttpError;
      alert(err.message);
    }
  };

  const togglePublishStatus = async () => {
    const newPublishStatus = !data._published;
    const updateStatus = await UpdateContentItem(content_type, id ?? '', {
      $set: { _published: newPublishStatus },
    });

    if (updateStatus.ok) {
      updateField('_published', newPublishStatus);
    }

    alert(`Publish status: ${newPublishStatus}`);
  };

  const saveAction =
    action === 'Create' ? createContentItem : updateContentItem;

  return (
    <div className={styles.container}>
      <button className={styles.save_button} onClick={saveAction}>
        Save Draft
      </button>
      <button className={styles.publish_button} onClick={togglePublishStatus}>
        Publish Draft
      </button>
    </div>
  );
}
