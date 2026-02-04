import {Footer} from '@repo/ui/components/layout/footer/Footer';

export default function WithFooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
