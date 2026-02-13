import {ProjectContainer} from '@/app/(with-header)/(with-footer)/project/_components/ProjectContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'COTATO | PROJECT',
  description: '함께 만들어 도착한, COTATO의 프로젝트를 만나 보세요.',
  openGraph: {
    title: 'COTATO | PROJECT',
    description: '함께 만들어 도착한, COTATO의 프로젝트를 만나 보세요.',
  },
};

export default function ProjectPage() {
  return (
    <SuspenseWrapper>
      <div>
        <ProjectContainer />
      </div>
    </SuspenseWrapper>
  );
}
