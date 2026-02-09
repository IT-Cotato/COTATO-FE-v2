import {ProjectDetailContainer} from './_container/ProjectDetailContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function ProjectDetailPage() {
  return (
    <SuspenseWrapper>
      <ProjectDetailContainer />
    </SuspenseWrapper>
  );
}
