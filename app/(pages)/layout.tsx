import '@globals/styles/colors.scss';
import '@globals/styles/spacers.scss';
import '@globals/styles/variables.scss';
import '@globals/styles/borders.scss';
import '@globals/styles/globals.scss';

import fonts from '@globals/fonts';
import metadata from '@globals/metadata.json';
import { AuthContextProvider } from '@contexts/AuthContext';
import { Suspense } from 'react';

export { metadata };

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fonts}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthContextProvider>{children} </AuthContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
