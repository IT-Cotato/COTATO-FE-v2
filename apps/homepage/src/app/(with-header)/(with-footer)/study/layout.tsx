import ProjectBanner from '../project/_components/ProjectBanner';

/** 프로젝트와 동일한 배너·반응형 구조를 사용하는 스터디 영역이다. */
export default function StudyLayout({children}: {children: React.ReactNode}) {
  return (
    <section className='flex min-h-screen flex-col items-center'>
      <ProjectBanner kind='study' />
      {children}
    </section>
  );
}
