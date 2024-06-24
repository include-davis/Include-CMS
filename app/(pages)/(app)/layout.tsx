import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
import Sidebar from '@components/Sidebar/Sidebar';
import styles from './layout.module.scss';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div className={styles.content}>{children}</div>
    </div>
  );
}
