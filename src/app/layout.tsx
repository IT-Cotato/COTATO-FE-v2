import {Footer} from '@/components/layout/Footer';
import {Header} from '@/components/layout/Header';
import {Metadata} from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'COTATO RECRUIT',
  description: 'COTATO RECRUIT WEB APPLICATION',
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

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang='ko'
      className={`${pretendard.variable} ${sebangGothic.variable} antialiased`}>
      <body className='flex min-h-screen w-full flex-col'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
