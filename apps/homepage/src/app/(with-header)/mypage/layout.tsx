import {SideBar} from '@/components/sidebar/SideBar';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='flex min-h-screen w-full min-w-360 flex-row'>
      <aside className='z-sidebar sticky left-0 bg-neutral-50'>
        <SideBar isAdmin />
      </aside>
      <main className='min-w-0 flex-1'>{children}</main>
    </section>
  );
}
