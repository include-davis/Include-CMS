'use client';

import styles from './SidebarDropdown.module.scss';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import arrow from '@public/navigation/sidebar/arrow.svg';
import useToggle from '@hooks/useToggle';
import useSidebarContext from '@hooks/useSidebar';

interface LinkInt {
  name: string;
  url: string;
}

interface SidebarDropdownProps {
  icon: StaticImageData;
  name: string;
  slug: string;
  links: LinkInt[];
}

export default function SidebarDropdown({
  icon,
  name,
  slug,
  links,
}: SidebarDropdownProps) {
  const { activeLink, setActiveLink } = useSidebarContext();
  const { state: active, toggleState: toggleActive } = useToggle(
    activeLink.startsWith(slug)
  );

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
            className={`${styles.link} ${
              activeLink.startsWith(link.url) ? styles.active : null
            }`}
            onClick={() => setActiveLink(link.url)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
