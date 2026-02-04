import Providers from '@/app/providers';

import {ConditionalAuthProvider} from '@/components/providers/ConditionalAuthProvider';
import {Footer} from '@repo/ui/components/layout/footer/Footer';

export default function WithFooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <ConditionalAuthProvider>
        <main className='flex-1'>{children}</main>
      </ConditionalAuthProvider>
      <Footer />
    </Providers>
  );
}
