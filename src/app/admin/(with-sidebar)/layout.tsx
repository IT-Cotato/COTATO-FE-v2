import {AdminSideBar} from '@/app/admin/_components/AdminSideBar';

export default function AdminWithSideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='flex min-h-screen w-full flex-row gap-23.5 bg-neutral-50 px-30 py-28.75'>
      <AdminSideBar />
      <main className='flex-1'>{children}</main>
    </section>
  );
}
