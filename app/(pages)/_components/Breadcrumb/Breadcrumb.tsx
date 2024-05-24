'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Breadcrumb.module.scss';
import separatorImage from '@public/index/breadcrumb.png';

type TBreadcrumbProps = {
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const NextBreadcrumb: React.FC<TBreadcrumbProps> = ({
  containerClasses = '',
  listClasses = '',
  activeClasses = '',
  capitalizeLinks = false,
}: TBreadcrumbProps) => {
  const paths = usePathname();
  const pathNames: string[] = paths.split('/').filter((path: string) => path);

  return (
    <div>
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
            <React.Fragment key={index}>
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
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default NextBreadcrumb;
