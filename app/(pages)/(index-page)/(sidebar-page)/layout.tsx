import '@globals/styles/colors.scss';
import '@globals/styles/spacers.scss';
import '@globals/styles/variables.scss';
import '@globals/styles/globals.scss';
import fonts from '@globals/fonts';
import metadata from '@globals/metadata.json';
import Navbar from '@components/Navbar/Navbar';
import NextBreadcrumb from '@components/Breadcrumb/Breadcrumb';
import styles from './layout.module.scss';

export { metadata };

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fonts} ${styles.wrapper}`}>
        <Navbar />
        <div className={styles.sidebar}>
          <NextBreadcrumb
            activeClasses="activeItem"
            containerClasses="container"
            listClasses="listItem"
            capitalizeLinks
          />
          {children}
        </div>
      </body>
    </html>
  );
}
