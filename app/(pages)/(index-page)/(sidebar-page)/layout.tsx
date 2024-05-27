import '@globals/styles/colors.scss';
import '@globals/styles/spacers.scss';
import '@globals/styles/variables.scss';
import '@globals/styles/globals.scss';
import Navbar from '@components/Navbar/Navbar';
import NextBreadcrumb from '@components/Breadcrumb/Breadcrumb';
import styles from './layout.module.scss';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <NextBreadcrumb
            activeClasses="activeItem"
            containerClasses="container"
            listClasses="listItem"
            capitalizeLinks
          />
          {children}
        </div>
      </div>
    </>
  );
}
