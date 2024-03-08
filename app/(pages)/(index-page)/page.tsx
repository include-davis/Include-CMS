import Hero from './_components/Hero/Hero';
import React from 'react';
import { SelectModeContextProvider } from '../_contexts/SelectModeContext';

export default function Home() {
  return (
    <main>
      <SelectModeContextProvider>
        <Hero />
      </SelectModeContextProvider>
    </main>
  );
}
