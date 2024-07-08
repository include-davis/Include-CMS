import { useContext } from 'react';
import { FilterContext } from '@contexts/FilterContext';

export default function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      'useFilterContext must be used within an FilterContextProvider'
    );
  }
  return context;
}
