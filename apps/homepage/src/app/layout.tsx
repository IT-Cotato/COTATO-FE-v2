import type {Metadata} from 'next';
import '@/styles/globals.css';
import '@repo/ui/styles.css';
import localFont from 'next/font/local';
import Providers from '@/app/providers';
import {AuthProvider} from '@/components/providers/AuthProvider';
import GoogleAnalytics from '@/lib/GoogleAnalytics';
import {MobileBlockOverlay} from '@repo/ui/components/overlay/MobileBlockOverlay';

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
        <AuthProvider>
          <body>
            <MobileBlockOverlay title='코테이토 공식 홈페이지' />
            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
              <GoogleAnalytics
                gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
              />
            ) : null}
            <main>{children}</main>
          </body>
        </AuthProvider>
      </Providers>
    </html>
  );
}
