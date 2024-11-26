import React from 'react';
import { useNotification } from '@hooks/useNotificationContext';
import useContentWindowContext from '@app/(pages)/_hooks/useContentWindowContext';
import styles from './Notification.module.scss';

export default function NotificationComponent() {
  const { notifications } = useNotification();
  const { top, right } = useContentWindowContext();

  console.log(top, right);

  const dynamicStyles = {
    container: {
      top: `${top}px`,
      right: `${window.innerWidth - right}px`,
      padding: notifications.length > 0 ? '10px' : '0',
    },
  };

  return (
    <div className={styles.container} style={dynamicStyles.container}>
      {notifications.map((notification) => (
        <div key={notification.id} className={styles[notification.type]}>
          {notification.message}
        </div>
      ))}
    </div>
  );
}
