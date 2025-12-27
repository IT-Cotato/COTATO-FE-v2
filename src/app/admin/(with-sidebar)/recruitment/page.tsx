import {ActiveRecruitment} from '@/app/admin/(with-sidebar)/recruitment/_components/active-recruitment/ActiveRecruitment';
import {ManageMail} from '@/app/admin/(with-sidebar)/recruitment/_components/manage-mail/ManageMail';

export default function AdminRecruitmentPage() {
  return (
    <div className='flex flex-col gap-5'>
      <ActiveRecruitment />
      <ManageMail />
    </div>
  );
}
