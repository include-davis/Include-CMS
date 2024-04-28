import { useContext } from 'react';
import { SelectModeContext } from './SelectModeContext';

const useSelectMode = () => {
  const context = useContext(SelectModeContext);

  if (!context) {
    throw new Error(
      'useSelectMode must be used within a SelectModeContextProvider'
    );
  }
  const { selectMode, toggleSelectMode } = context;
  return { selectMode, toggleSelectMode };
};

export default useSelectMode;
