import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SelectModeContextType {
  selectMode: boolean;
  toggleSelectMode: () => void;
  setSelectMode: (mode: boolean) => void;
}

const SelectModeContext = createContext<SelectModeContextType | undefined>(
  undefined
);

export const useSelectMode = () => {
  const context = useContext(SelectModeContext);
  if (!context) {
    throw new Error(
      'useSelectMode must be used within a SelectModeContextProvider'
    );
  }
  return context;
};

const SelectModeContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectMode, setSelectMode] = useState<boolean>(false);

  const toggleSelectMode = () => {
    setSelectMode((prevMode) => !prevMode);
  };

  return (
    <SelectModeContext.Provider
      value={{ selectMode, toggleSelectMode, setSelectMode }}
    >
      {children}
    </SelectModeContext.Provider>
  );
};

export { SelectModeContext, SelectModeContextProvider };
