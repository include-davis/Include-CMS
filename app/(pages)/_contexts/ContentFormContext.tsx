'use client';
import { useState, createContext } from 'react';

interface ContentFormContextValue {
  content_type: string;
  id: string | null;
  data: { [key: string]: any };
  updateField: (field_name: string, value: any) => void;
  setData: (value: any) => void;
  setId: (value: string) => void;
}

export type { ContentFormContextValue };

export const ContentFormContext = createContext<ContentFormContextValue>({
  content_type: '',
  id: null,
  data: {},
  updateField: (_, __) => {},
  setData: (_) => {},
  setId: (_) => {},
});

interface ContentFormContextProviderProps {
  content_type: string;
  id?: string | null;
  initialValue?: object;
  children: React.ReactNode;
}

export default function ContentFormContextProvider({
  content_type,
  id = null,
  initialValue = {},
  children,
}: ContentFormContextProviderProps) {
  const [data, setData] = useState(initialValue);
  const [idVar, setId] = useState<string | null>(id);

  const updateField = (field_name: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [field_name]: value,
    }));
  };

  const value = {
    content_type,
    id: idVar,
    data,
    updateField,
    setData,
    setId,
  };

  return (
    <ContentFormContext.Provider value={value}>
      {children}
    </ContentFormContext.Provider>
  );
}
