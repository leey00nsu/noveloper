import { ColorSchemeScript } from '@mantine/core';
import type { Metadata } from 'next';

import { pretendard } from './font-provider';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Noveloper',
  description: 'AI 기반 소설 창작 플랫폼, Noveloper',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
