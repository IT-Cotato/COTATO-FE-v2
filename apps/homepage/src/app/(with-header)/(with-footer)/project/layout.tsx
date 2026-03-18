import ProjectBanner from './_components/ProjectBanner';

export default function ProjectLayout({children}: {children: React.ReactNode}) {
  return (
    <section className='flex min-h-screen flex-col items-center'>
      <ProjectBanner />
      {children}
    </section>
  );
}
