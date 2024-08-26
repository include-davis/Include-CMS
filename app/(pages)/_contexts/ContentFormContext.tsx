'use client';
import { useState, createContext } from 'react';
import schema from '@schema/_index';
import { CollectionSchema } from '@datatypes/schema';

interface ContentFormContextValue {
  collection: string;
  data: { [_: string]: any };
  updateField: (field_name: string, value: any) => void;
}

export type { ContentFormContextValue };

export const ContentFormContext = createContext<ContentFormContextValue>({
  collection: '',
  data: {},
  updateField: (_, __) => {},
});

interface ContentFormContextProviderProps {
  collection: string;
  initialValue?: { [_: string]: any };
  children: React.ReactNode;
}

export default function ContentFormContextProvider({
  collection,
  initialValue,
  children,
}: ContentFormContextProviderProps) {
  const collection_schema = (schema as CollectionSchema)[collection];
  const generateInitialValue = () => {
    const res: { [key: string]: any } = {};
    for (const field of collection_schema.fields) {
      res[field.name] = field.type.defaultValue;
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

  // const upload = async () => {};

  const value = {
    collection,
    data,
    updateField,
  };

  return (
    <ContentFormContext.Provider value={value}>
      {children}
    </ContentFormContext.Provider>
  );
}
