import type {Metadata} from 'next';
import '@repo/ui/styles.css';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import Providers from '@/app/providers';
import {AuthProvider} from '@/components/providers/AuthProvider';
import {GoogleAnalytics} from '@/lib/GoogleAnalytics';
import {BeUsableRum} from '@/lib/BeUsableRum';
import {GoogleTagManager, GtmNoscript} from '@/lib/GoogleTagManager';
import {HEADER_HEIGHT, MOBILE_HEADER_HEIGHT} from '@repo/ui/constants/ui';
import type {CSSProperties} from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cotato.kr'),
  title: 'COTATO | IT 연합 동아리',
  description: '함께 도달하는 성장의 종착지, 코테이토의 공식 홈페이지입니다.',
  keywords: [
    '코테이토',
    'COTATO',
    'IT동아리',
    '연합동아리',
    '코딩동아리',
    '대학생동아리',
    '개발자스터디',
  ],
  authors: [{name: 'COTATO'}],
  creator: 'COTATO',
  publisher: 'COTATO',
  openGraph: {
    title: 'COTATO | IT 연합 동아리',
    description: '함께 도달하는 성장의 종착지, 코테이토의 공식 홈페이지입니다.',
    url: 'https://www.cotato.kr',
    siteName: 'COTATO',
    images: [
      {
        url: '/images/meta-data/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'COTATO 공식 홈페이지 메인 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'COTATO | IT 연합 동아리',
    description: '함께 도달하는 성장의 종착지, 코테이토 공식 홈페이지',
    images: ['/images/meta-data/thumbnail.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'U9oZYgH8MZIHDHHr9HptzFTZIjUgHHXaB5es3_D76hY',
  },
};

const pretendard = localFont({
  src: '../fonts/Pretendard/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
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
  const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER;

  return (
    <html
      lang='ko'
      className={`${pretendard.variable} ${roboto.variable} antialiased`}
      style={
        {
          '--header-height': `${MOBILE_HEADER_HEIGHT}px`,
          '--header-height-lg': `${HEADER_HEIGHT}px`,
        } as CSSProperties
      }>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <Providers>
        <AuthProvider>
          <body>
            {gtmId && <GtmNoscript gtmId={gtmId} />}
            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
              <GoogleAnalytics
                gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
              />
            ) : null}
            <BeUsableRum />
            <main>{children}</main>
            <div id='datepicker-portal' className='z-datepicker relative' />
          </body>
        </AuthProvider>
      </Providers>
    </html>
  );
}
