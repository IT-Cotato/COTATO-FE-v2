import {AddProjectFormContainer} from '@/app/(with-header)/(with-footer)/project/add-project/_containers/AddProjectFormContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AddProjectPage() {
  return (
    <div className='flex min-w-275 flex-col'>
      <SuspenseWrapper>
        <AddProjectFormContainer />
      </SuspenseWrapper>
    </div>
  );
}
