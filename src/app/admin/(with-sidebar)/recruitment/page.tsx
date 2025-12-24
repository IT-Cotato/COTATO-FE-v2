import {ActiveRecruitment} from './_components/active-recruitment/ActiveRecruitment';
import {ManageMail} from './_components/manage-mail/ManageMail';

export default function AdminRecruitmentPage() {
  return (
    <div className='flex flex-col gap-5'>
      <ActiveRecruitment />
      <ManageMail />
    </div>
  );
}
