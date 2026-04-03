import {Footer} from '@repo/ui/components/layout/footer/Footer';
import {TERMS_LINK} from '@repo/ui/constants/terms-link';

export default function WithFooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className='w-full flex-1'>{children}</main>
      <Footer termsHref={TERMS_LINK.homepage} termsText='서비스 이용약관' />
    </div>
  );
}
