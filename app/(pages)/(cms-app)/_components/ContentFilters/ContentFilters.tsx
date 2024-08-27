'use client';

import Image from 'next/image';
import useFilterContext from '@hooks/useFilters';
import styles from './ContentFilters.module.scss';

import searchIcon from '/public/app/search.svg';
import chevronDown from '/public/app/chevron-down.svg';

interface ContentFiltersProps {
  searchPlaceholder: string;
  filterOptions?: string[];
}

export default function ContentFilters({
  searchPlaceholder,
  filterOptions = [],
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
      <div className={styles.dropdown_container}>
        <div className={styles.dropdown_button}>
          <p>Filter By</p>
          <Image
            src={chevronDown}
            alt="chevron-arrow"
            className={styles.arrow}
          />
        </div>
        <div className={styles.options}>
          {filterOptions.map((option: string) => (
            <div key={option}>{option}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
