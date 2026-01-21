import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {ActiveRecruitment} from '@/app/admin/recruitment/_components/active-recruitment/ActiveRecruitment';
import {ManageMail} from '@/app/admin/recruitment/_components/manage-mail/ManageMail';
import {RecruitmentInitializer} from '@/app/admin/recruitment/_components/RecruitmentInitializer';
import {AddGeneration} from '@/app/admin/recruitment/_components/add-generation/AddGeneration';

export default function AdminRecruitmentPage() {
  return (
    <RecruitmentInitializer>
      <SuspenseWrapper>
        <div className='flex flex-col gap-6'>
          <AddGeneration />
          <ActiveRecruitment />
          <ManageMail />
        </div>
      </SuspenseWrapper>
    </RecruitmentInitializer>
  );
}
