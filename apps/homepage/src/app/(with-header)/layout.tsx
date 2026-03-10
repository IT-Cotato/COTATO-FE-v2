import {HeaderContainer} from '@/app/(with-header)/_containers/HeaderContainer';

export default function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeaderContainer />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
