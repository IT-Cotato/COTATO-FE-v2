import {Metadata} from 'next';
import '@repo/ui/styles.css';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import Providers from '@/app/providers';
import {ConditionalAuthProvider} from '@/components/providers/ConditionalAuthProvider';
import {GoogleAnalytics} from '@/lib/GoogleAnalytics';
import {BeUsableRum} from '@/lib/BeUsableRum';
import {GoogleTagManager, GtmNoscript} from '@/lib/GoogleTagManager';
import {HeaderContainer} from '@/app/_containers/HeaderContainer';
import {Footer} from '@repo/ui/components/layout/footer/Footer';
import {TERMS_LINK} from '@repo/ui/constants/terms-link';
import {HEADER_HEIGHT, MOBILE_HEADER_HEIGHT} from '@repo/ui/constants/ui';
import type {CSSProperties} from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://recruit.cotato.kr'),
  title: 'COTATO | RECRUIT',
  description: '코테이토에서 당신의 여정을 함께하세요!',
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
    title: 'COTATO | RECRUIT',
    description: '코테이토에서 당신의 여정을 함께하세요!',
    url: 'https://recruit.cotato.kr',
    siteName: 'COTATO',
    images: [
      {
        url: '/meta-data/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'COTATO 리쿠르트 페이지 메인 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'COTATO | RECRUIT',
    description: '코테이토에서 당신의 여정을 함께하세요!',
    images: ['/meta-data/thumbnail.png'],
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

export default function RootLayout({children}: {children: React.ReactNode}) {
  const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER;

  return (
    <html
      lang='ko'
      className={`${pretendard.variable} ${roboto.variable} antialiased`}
      style={{'--header-height': `${MOBILE_HEADER_HEIGHT}px`, '--header-height-lg': `${HEADER_HEIGHT}px`} as CSSProperties}>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className='flex min-h-screen w-full flex-col'>
        <Providers>
          <ConditionalAuthProvider>
            {gtmId && <GtmNoscript gtmId={gtmId} />}
            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
              <GoogleAnalytics
                gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
              />
            ) : null}
            <BeUsableRum />
            <HeaderContainer />
            <main className='flex w-full flex-1 flex-col'>{children}</main>
            <Footer termsHref={TERMS_LINK.recruit} termsText='서비스 이용약관 및 개인정보 처리방침' />
          </ConditionalAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
