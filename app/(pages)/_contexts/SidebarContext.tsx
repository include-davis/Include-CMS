'use client';
import { usePathname } from 'next/navigation';
import { createContext, useState } from 'react';

interface SidebarContextValue {
  activeLink: string;
  setActiveLink: React.Dispatch<React.SetStateAction<string>>;
}

export type { SidebarContextValue };

export const SidebarContext = createContext<SidebarContextValue>({
  activeLink: '',
  setActiveLink: () => {},
});

export default function SidebarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);

  const value = {
    activeLink,
    setActiveLink,
  };
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
