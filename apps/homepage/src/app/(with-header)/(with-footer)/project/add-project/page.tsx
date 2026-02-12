import {AddProjectFormContainer} from '@/app/(with-header)/(with-footer)/project/add-project/_containers/AddProjectFormContainer';
import {ProtectedRoute} from '@/components/auth/ProtectedRoute';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AddProjectPage() {
  return (
    <ProtectedRoute requireRole='ADMIN'>
      <div className='flex min-w-275 flex-col'>
        <SuspenseWrapper>
          <AddProjectFormContainer />
        </SuspenseWrapper>
      </div>
    </ProtectedRoute>
  );
}
