import {ProjectContainer} from '@/app/(with-header)/(with-footer)/project/_components/ProjectContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function ProjectPage() {
  return (
    <SuspenseWrapper>
      <div>
        <ProjectContainer />
      </div>
    </SuspenseWrapper>
  );
}
