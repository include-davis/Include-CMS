'use client';
import { createContext, useState, useCallback } from 'react';

interface SelectContextValue {
  selectMode: boolean;
  toggleSelectMode: () => void;
  selectedIds: string[];
}

export type { SelectContextValue };

export const SelectContext = createContext<SelectContextValue>({
  selectMode: true,
  toggleSelectMode: () => {},
  selectedIds: [],
});

export function SelectContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectMode, setSelectMode] = useState(false);
  const toggleSelectMode = useCallback(() => {
    setSelectMode((prev) => !prev);
  }, [setSelectMode]);

  const value = {
    selectMode,
    toggleSelectMode,
    selectedIds: [],
  };
  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
}
