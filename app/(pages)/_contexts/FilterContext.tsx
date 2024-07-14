'use client';
import { createContext, useState, useCallback } from 'react';

interface FilterContextValue {
  filters: string[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  applyFilters: (_: object[]) => object[];
}

export type { FilterContextValue };

export const FilterContext = createContext<FilterContextValue>({
  filters: [],
  search: '',
  setSearch: () => {},
  setFilters: () => {},
  applyFilters: (_: object[]) => [],
});

export default function FilterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');

  const applyFilters = useCallback(
    (data: object[]) => {
      const hasValueContaining = (obj: any, searchStr: string): any => {
        const values = Object.values(obj);
        if (typeof obj === 'string') {
          return obj.toLowerCase().includes(searchStr.toLowerCase());
        }

        return values.some((value: any) =>
          hasValueContaining(value, searchStr)
        );
      };
      return data.filter((item) => hasValueContaining(item, search));
    },
    [search]
  );

  const value = {
    filters,
    search,
    setFilters,
    setSearch,
    applyFilters,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
