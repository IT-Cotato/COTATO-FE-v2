import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {ManageResult} from '@/app/admin/(with-sidebar)/results/_components/mail-manage/ManageResult';
import {ManageResultMail} from '@/app/admin/(with-sidebar)/results/_components/mail-manage/ManageResultMail';

export default function AdminResultsPage() {
  return (
    <SuspenseWrapper>
      <div className='flex flex-col gap-13.5'>
        <ManageResult />
        <ManageResultMail />
      </div>
    </SuspenseWrapper>
  );
}
