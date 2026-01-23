import {AdminSideBar} from '@/app/admin/_components/AdminSideBar';
import {ProtectedRoute} from '@/components/auth/ProtectedRoute';

export default function AdminWithSideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute requireRole='STAFF'>
      <section className='flex min-h-screen w-full min-w-360 flex-row bg-white'>
        <aside className='sticky top-0 left-0 z-sidebar'>
          <AdminSideBar />
        </aside>
        <main className='min-w-0 flex-1'>{children}</main>
      </section>
    </ProtectedRoute>
  );
}
