import {AdminSideBar} from '@/app/admin/_components/AdminSideBar';
import {ProtectedRoute} from '@/components/auth/ProtectedRoute';

export default function AdminWithSideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute requireRole='STAFF'>
      <section className='flex min-h-screen w-full flex-row gap-23.5 bg-neutral-50 px-60 py-16.75'>
        <aside>
          <AdminSideBar />
        </aside>

        <main className='min-w-0 flex-1'>{children}</main>
      </section>
    </ProtectedRoute>
  );
}
