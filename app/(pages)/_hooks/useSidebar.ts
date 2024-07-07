import { useContext } from 'react';
import { SidebarContext } from '@contexts/SidebarContext';

export default function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      'useSidebarContext must be used within an SidebarContextProvider'
    );
  }
  return context;
}
