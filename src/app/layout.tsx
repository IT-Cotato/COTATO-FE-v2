import '@/app/globals.css';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'COTATO RECRUIT',
  description: 'COTATO RECRUIT WEB APPLICATION',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
