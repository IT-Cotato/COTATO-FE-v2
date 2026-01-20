import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {ManageResultMail} from '@/app/admin/results/_components/mail-manage/ManageResultMail';
import {ManageResult} from '@/app/admin/results/_components/result-manage/ManageResult';

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
