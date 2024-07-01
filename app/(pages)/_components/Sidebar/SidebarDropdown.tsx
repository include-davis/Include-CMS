'use client';

import styles from './SidebarDropdown.module.scss';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import arrow from '/public/navigation/sidebar/arrow.svg';
import useToggle from '@hooks/useToggle';

interface LinkInt {
  name: string;
  url: string;
}

interface SidebarDropdownProps {
  icon: StaticImageData;
  name: string;
  links: LinkInt[];
}

export default function SidebarDropdown({
  icon,
  name,
  links,
}: SidebarDropdownProps) {
  const { state: active, toggleState: toggleActive } = useToggle(false);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={toggleActive}>
        <Image src={icon} alt={name} height={20} />
        <h3>{name}</h3>
        <Image
          src={arrow}
          alt={'arrow'}
          height={8}
          className={`${styles.arrow} ${active ? styles.active : null}`}
        />
      </button>
      <div className={`${styles.links} ${active ? styles.active : null}`}>
        {links.map((link: LinkInt) => (
          <Link
            href={link.url}
            key={link.url}
            className={`${styles.link} ${active ? styles.active : null}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
