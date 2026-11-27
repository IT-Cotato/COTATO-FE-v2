import {AddProjectFormContainer} from '../../project/add-project/_containers/AddProjectFormContainer';
import {ProtectedRoute} from '@/components/auth/ProtectedRoute';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

/** 기존 프로젝트와 동일한 관리자 접근 검사를 거쳐 스터디 등록 폼을 연다. */
export default function AddStudyPage() {
  return (
    <ProtectedRoute requireRole='ADMIN'>
      <div className='flex w-full flex-col'>
        <SuspenseWrapper>
          <AddProjectFormContainer kind='study' />
        </SuspenseWrapper>
      </div>
    </ProtectedRoute>
  );
}
