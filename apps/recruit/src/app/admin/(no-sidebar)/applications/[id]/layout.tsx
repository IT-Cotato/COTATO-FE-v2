import {ProtectedRoute} from '@/components/auth/ProtectedRoute';

export default function AdminNoSideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute requireRole='STAFF'>
      <section className='flex min-h-screen w-full flex-row items-center justify-center bg-white px-6 py-7.5 lg:px-6.25 lg:py-10'>
        <main className='max-w-275 min-w-0 flex-1'>{children}</main>
      </section>
    </ProtectedRoute>
  );
}
