import { useContext } from 'react';
import { SelectModeContext } from '../_contexts/SelectModeContext';

const useSelectMode = () => {
  const context = useContext(SelectModeContext);

  if (!context) {
    throw new Error(
      'useSelectMode must be used within a SelectModeContextProvider'
    );
  }

  return context;
};

export default useSelectMode;
