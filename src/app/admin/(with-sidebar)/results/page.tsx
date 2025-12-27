import {ManageResult} from '@/app/admin/(with-sidebar)/results/_components/ManageResult';
import {ManageResultMail} from '@/app/admin/(with-sidebar)/results/_components/ManageResultMail';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminResultsPage() {
  return (
    <SuspenseWrapper>
      <div className='flex flex-col gap-6'>
        <ManageResult />
        <ManageResultMail />
      </div>
    </SuspenseWrapper>
  );
}
