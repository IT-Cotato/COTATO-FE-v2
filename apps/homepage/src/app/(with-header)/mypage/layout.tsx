import {ProtectedRoute} from '@/components/auth/ProtectedRoute';
import {SideBarContainer} from '@/components/sidebar/SideBarContainer';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <section className='flex min-h-screen w-full min-w-360 flex-row'>
        <aside className='z-sidebar sticky left-0 bg-neutral-50'>
          <SideBarContainer />
        </aside>
        <main className='min-w-0 flex-1'>{children}</main>
      </section>
    </ProtectedRoute>
  );
}
