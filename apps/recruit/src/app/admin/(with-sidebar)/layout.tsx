import {AdminSideBarContainer} from '@/app/admin/_containers/AdminSideBarContainer';
import {ProtectedRoute} from '@/components/auth/ProtectedRoute';

export default function AdminWithSideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute requireRole='STAFF'>
      <section className='flex min-h-screen w-full flex-col items-start bg-white px-6 py-5 lg:min-w-360 lg:flex-row lg:px-0 lg:py-0'>
        <AdminSideBarContainer />
        <main className='min-w-0 flex-1'>{children}</main>
      </section>
    </ProtectedRoute>
  );
}
