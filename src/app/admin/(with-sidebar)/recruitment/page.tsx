import {ActiveRecruitment} from '@/app/admin/(with-sidebar)/recruitment/_components/active-recruitment/ActiveRecruitment';
import {ManageMail} from '@/app/admin/(with-sidebar)/recruitment/_components/manage-mail/ManageMail';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminRecruitmentPage() {
  return (
    <SuspenseWrapper>
      <div className='flex flex-col gap-6'>
        <ActiveRecruitment />
        <ManageMail />
      </div>
    </SuspenseWrapper>
  );
}
