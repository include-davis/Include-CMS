'use client';

import Image from 'next/image';
import useFilterContext from '@hooks/useFilters';
import styles from './ContentFilters.module.scss';

import searchIcon from '/public/app/search.svg';

interface ContentFiltersProps {
  searchPlaceholder: string;
}

export default function ContentFilters({
  searchPlaceholder,
}: ContentFiltersProps) {
  const { search, setSearch } = useFilterContext();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchbar}>
        <Image src={searchIcon} alt="search-icon" className={styles.image} />
        <input
          type="text"
          value={search}
          placeholder={searchPlaceholder}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.dropdown}>DROPDOWN</div>
    </div>
  );
}
