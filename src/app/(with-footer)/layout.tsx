import Providers from '@/app/providers';
import {Footer} from '@/components/layout/Footer';
import {ConditionalAuthProvider} from '@/components/providers/ConditionalAuthProvider';

export default function AdminNoSideBarLayout({
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
