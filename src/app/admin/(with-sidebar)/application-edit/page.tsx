import {AdminApplicationQuestionsContainer} from '@/app/admin/(with-sidebar)/application-edit/_containers/AdminApplicationQuestionsContainer';
import {AdminRecruitmentInformationContainer} from '@/app/admin/(with-sidebar)/application-edit/_containers/AdminRecruitmentInformationContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminApplicationEditPage() {
  return (
    <section className='flex flex-col gap-6'>
      <h1 className='text-h4'>모집 기간</h1>
      <SuspenseWrapper>
        <AdminRecruitmentInformationContainer />
        <AdminApplicationQuestionsContainer />
      </SuspenseWrapper>
    </section>
  );
}
