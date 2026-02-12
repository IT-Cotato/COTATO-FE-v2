import type {Metadata} from 'next';
import '@/styles/globals.css';
import '@repo/ui/styles.css';
import localFont from 'next/font/local';
import Providers from '@/app/providers';

export const metadata: Metadata = {
  title: 'COTATO',
  description: 'COTATO HOMEPAGE WEB APPLICATION',
};

const pretendard = localFont({
  src: '../fonts/Pretendard/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

const sebangGothic = localFont({
  src: [
    {
      path: '../fonts/Sebang-gothic/SEBANG Gothic OTF.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Sebang-gothic/SEBANG Gothic OTF Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sebang-gothic',
  display: 'swap',
});

const roboto = localFont({
  src: '../fonts/Roboto/RobotoVariable.ttf',
  variable: '--font-roboto',
  display: 'swap',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='ko'
      className={`${pretendard.variable} ${sebangGothic.variable} ${roboto.variable} antialiased`}>
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
