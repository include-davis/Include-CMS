import React, { createContext, useState, ReactNode } from 'react';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'general';
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    message: string,
    type: 'success' | 'error' | 'general'
  ) => void;
  removeNotification: (id: number) => void;
}

export type { NotificationContextType };

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

let notificationId = 0; // ID counter

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (
    message: string,
    type: 'success' | 'error' | 'general' = 'general'
  ) => {
    const id = notificationId++;
    // Prepend to the notifications
    setNotifications((prev) => [{ id, message, type }, ...prev]);

    // Automatically remove the notification after 5 seconds
    console.log(message);
    console.log(type);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id: number) => {
    console.log('Notification removed');
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
