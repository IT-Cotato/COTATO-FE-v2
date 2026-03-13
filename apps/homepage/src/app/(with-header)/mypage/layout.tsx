import {MyPageClientWrapper} from '@/app/(with-header)/mypage/_containers/MyPageClientWrapper';
import {SideBarContainer} from '@/components/sidebar/SideBarContainer';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MyPageClientWrapper>
      <section className='flex min-h-screen w-full min-w-0 flex-col lg:min-w-360 lg:flex-row'>
        <aside className='z-sidebar sticky left-0 hidden bg-neutral-50 lg:block'>
          <SideBarContainer />
        </aside>
        <main className='min-w-0 flex-1'>{children}</main>
      </section>
    </MyPageClientWrapper>
  );
}
