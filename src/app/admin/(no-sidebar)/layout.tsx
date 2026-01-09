import {ProtectedRoute} from '@/components/auth/ProtectedRoute';

export default function AdminNoSideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute requireRole='STAFF'>
      <section className='flex min-h-screen w-full bg-neutral-50 px-90 py-30'>
        <main className='flex-1'>{children}</main>
      </section>
    </ProtectedRoute>
  );
}
