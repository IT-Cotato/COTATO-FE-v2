import {ProjectDetailContainer} from '../../project/[projectId]/_container/ProjectDetailContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

/** 기존 상세 틀을 사용하되 다른 종류의 콘텐츠는 이 경로에서 편집하지 못하게 한다. */
export default function StudyDetailPage() {
  return (
    <SuspenseWrapper>
      <ProjectDetailContainer kind='study' />
    </SuspenseWrapper>
  );
}
