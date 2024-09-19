'use client';
import { useRef } from 'react';
import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
import Sidebar from '@components/Sidebar/Sidebar';
import styles from './layout.module.scss';
import ProtectedDisplay from '@components/ProtectedDisplay/ProtectedDisplay';
import AuthFailureRedirect from '@components/ProtectedDisplay/AuthFailureRedirect';
import { ContentWindowContext } from '../_contexts/ContentWindowContext';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentWindowRef = useRef(null);
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.breadcrumb}>
        <Breadcrumb
          activeClasses="activeItem"
          containerClasses="container"
          listClasses="listItem"
          capitalizeLinks
        />
      </div>
      <ContentWindowContext.Provider value={{ contentWindowRef }}>
        <div className={styles.content} ref={contentWindowRef}>
          <ProtectedDisplay failDisplay={<AuthFailureRedirect />}>
            {children}
          </ProtectedDisplay>
        </div>
      </ContentWindowContext.Provider>
    </div>
  );
}
