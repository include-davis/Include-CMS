'use client';
import { createContext, useState, useCallback } from 'react';

interface SelectContextValue {
  selectMode: boolean;
  toggleSelectMode: () => void;
  selectedIds: { [key: string]: any };
  toggleId: (id: string, data?: any) => void;
  resetSelectedIds: () => void;
}

export type { SelectContextValue };

export const SelectContext = createContext<SelectContextValue>({
  selectMode: true,
  toggleSelectMode: () => {},
  selectedIds: {},
  toggleId: (_: string, __: any) => {},
  resetSelectedIds: () => {},
});

export default function SelectContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<{ [key: string]: boolean }>(
    {}
  );
  const toggleSelectMode = useCallback(() => {
    setSelectMode((prev) => !prev);
    setSelectedIds({});
  }, [setSelectMode]);

  const resetSelectedIds = () => {
    setSelectedIds({});
  };

  const toggleId = (id: string, data: any = null) => {
    setSelectedIds({
      ...selectedIds,
      [id]: selectedIds?.[id] ? null : data || true,
    });
  };

  const value = {
    selectMode,
    toggleSelectMode,
    selectedIds,
    toggleId,
    resetSelectedIds,
  };
  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
}
