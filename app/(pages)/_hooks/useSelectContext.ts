import { useContext } from 'react';
import { SelectContext } from '@contexts/SelectContext';

export default function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      'useSelectContext must be used within an SelectContextProvider'
    );
  }
  return context;
}
