import {MyPageClientMobileWrapper} from '@/app/(with-header)/mypage/_containers/MyPageClientMobileWrapper';
import {SideBarContainer} from '@/components/sidebar/SideBarContainer';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MyPageClientMobileWrapper>
      <section className='flex min-h-screen w-full min-w-360 flex-col md:flex-row'>
        <aside className='z-sidebar sticky left-0 hidden bg-neutral-50 md:block'>
          <SideBarContainer />
        </aside>
        <main className='min-w-0 flex-1'>{children}</main>
      </section>
    </MyPageClientMobileWrapper>
  );
}
