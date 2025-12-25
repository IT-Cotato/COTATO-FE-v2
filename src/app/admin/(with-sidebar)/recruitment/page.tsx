import {ActiveRecruitment} from './_components/ActiveRecruitment';
import {ManageMail} from './_components/ManageMail';

export default function AdminRecruitmentPage() {
  return (
    <div className='flex flex-col gap-5'>
      <ActiveRecruitment />
      <ManageMail />
    </div>
  );
}
