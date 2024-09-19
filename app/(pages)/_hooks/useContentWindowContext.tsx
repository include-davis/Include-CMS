import { useContext } from 'react';
import { ContentWindowContext } from '@contexts/ContentWindowContext';

export default function useContentWindowContext() {
  const context = useContext(ContentWindowContext);
  if (!context) {
    throw new Error(
      'useContentWindowContext must be used within an ContentWindowContextProvider'
    );
  }
  return context;
}
