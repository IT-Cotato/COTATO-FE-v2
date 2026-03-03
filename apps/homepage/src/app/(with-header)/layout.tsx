import {Header} from '@/components/layout/header/Header';

export default function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
