'use client';
import styles from './Breadcrumb.module.scss';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import separatorImage from '/public/navigation/breadcrumb/breadcrumb.png';

type TBreadcrumbProps = {
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

export default function Breadcrumb({
  containerClasses = '',
  listClasses = '',
  activeClasses = '',
  capitalizeLinks = false,
}: TBreadcrumbProps) {
  const paths = usePathname();
  const pathNames: string[] = paths.split('/').filter((path: string) => path);

  return (
    <ul className={`${styles.container} ${containerClasses}`}>
      {pathNames.map((link: string, index: number) => {
        const href = `/${pathNames.slice(0, index + 1).join('/')}`;
        const itemClasses =
          paths === href
            ? `${styles.listItem} ${styles.activeItem} ${listClasses} ${activeClasses}`
            : `${styles.listItem} ${listClasses}`;
        const itemLink = capitalizeLinks
          ? link[0].toUpperCase() + link.slice(1, link.length)
          : link;
        return (
          <Fragment key={index}>
            <li className={itemClasses}>
              <Link href={href}>{itemLink}</Link>
            </li>
            {pathNames.length !== index + 1 && (
              <Image
                src={separatorImage}
                alt="separator"
                width={8}
                height={16}
                className={styles.separatorImage}
              />
            )}
          </Fragment>
        );
      })}
    </ul>
  );
}
