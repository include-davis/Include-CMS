import { useContext } from 'react';
import { ContentFormContext } from '@contexts/ContentFormContext';

export default function useContentFormContext() {
  const context = useContext(ContentFormContext);
  if (!context) {
    throw new Error(
      'useContentFormContext must be used within an ContentFormContextProvider'
    );
  }
  return context;
}
