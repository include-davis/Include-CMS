import { createContext, createRef } from 'react';

interface ContentWindowContextProviderValue {
  contentWindowRef: React.Ref<HTMLElement> | null;
}

export type { ContentWindowContextProviderValue };

export const ContentWindowContext = createContext({
  contentWindowRef: createRef<HTMLElement>(),
});
