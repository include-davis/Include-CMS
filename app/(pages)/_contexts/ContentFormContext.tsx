'use client';
import { useState, createContext } from 'react';
import schema from '@app/_utils/schema';

interface ContentFormContextValue {
  content_type: string;
  id: string | null;
  data: { [key: string]: any };
  updateField: (field_name: string, value: any) => void;
}

export type { ContentFormContextValue };

export const ContentFormContext = createContext<ContentFormContextValue>({
  content_type: '',
  id: null,
  data: {},
  updateField: (_, __) => {},
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
  initialValue,
  children,
}: ContentFormContextProviderProps) {
  const content_schema = schema[content_type];
  const generateInitialValue = () => {
    const res: { [key: string]: any } = {};
    for (const field of content_schema.getFieldArray()) {
      res[field.name] = field.defaultValue;
    }
    return res;
  };

  const [data, setData] = useState(initialValue ?? generateInitialValue());

  const updateField = (field_name: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [field_name]: value,
    }));
  };

  const value = {
    content_type,
    id,
    data,
    updateField,
  };

  return (
    <ContentFormContext.Provider value={value}>
      {children}
    </ContentFormContext.Provider>
  );
}
