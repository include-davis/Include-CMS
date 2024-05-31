'use client';
import Link from 'next/link';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import { useState } from 'react';
import styles from './Navbar.module.scss';
import useToggle from '@hooks/useToggle';
import chevronDown from '@public/index/chevron.png';
import chevronUp from '@public/index/chevron.png';
import Image from 'next/image';
import formConfig from '@globals/editor.config';
import { FormConfig } from '@globals/type';

interface NavLink {
  name: string;
  slug: string;
}

const generateNavLinks = (config: FormConfig): NavLink[] => {
  return config.sections.map((section: { name: string }) => ({
    name: section.name,
    slug: `/content/${section.name.toLowerCase()}`,
  }));
};

const navLinks: NavLink[] = generateNavLinks(formConfig);

export default function Navbar() {
  const [active, toggleActive, _, setInactive] = useToggle(false);
  const [contentOpen, setContentOpen] = useState(false);
  const [uploadedOpen, setUploadedOpen] = useState(false);

  const toggleContent = () => {
    setContentOpen((prev) => !prev);
    setUploadedOpen(false);
  };

  const toggleUploaded = () => {
    setUploadedOpen((prev) => !prev);
    setContentOpen(false);
  };

  return (
    <div className={styles.relative_wrapper}>
      <div className={styles.container}>
        <div className={styles.navbar_logo}>
          <Image
            src="/index/logo.png"
            alt="content icon"
            width={33}
            height={40}
          />
          <h2>ICMS</h2>
        </div>
        <div className={styles.nav_container}>
          <div
            className={`${styles.dropdown} ${active ? styles.active : null}`}
          >
            <div className={styles.dropdown_button} onClick={toggleContent}>
              <Image
                src="/index/content-icon.png"
                alt="content icon"
                width={20}
                height={25}
              />
              <p>Content</p>
              <Image
                src={contentOpen ? chevronUp : chevronDown}
                alt="Chevron"
                width={18}
                height={9}
                className={`${styles.chevron} ${
                  contentOpen ? styles.rotate : ''
                }`}
              />
            </div>
            {contentOpen && (
              <div className={`${styles.links}`}>
                {navLinks.map((link) => {
                  return (
                    <Link
                      key={link.slug}
                      href={link.slug}
                      onClick={setInactive}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            )}
            <div className={styles.dropdown_button} onClick={toggleUploaded}>
              <Image
                src="/index/uploaded-media-icon.png"
                alt="uploaded media icon"
                width={20}
                height={25}
              />
              <p>Uploaded Media</p>
              <Image
                src={uploadedOpen ? chevronUp : chevronDown}
                alt="Chevron"
                width={18}
                height={9}
                className={`${styles.chevron} ${
                  uploadedOpen ? styles.rotate : ''
                }`}
              />
            </div>
            <div className={`${styles.dropdown_button} ${styles.bottom_tab}`}>
              <Image
                src="/index/settings-icon.png"
                alt="uploaded media icon"
                width={24}
                height={24}
              />
              <p> Settings </p>
            </div>
          </div>
          <button className={styles.menu} onClick={toggleActive}>
            {active ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>
    </div>
  );
}
