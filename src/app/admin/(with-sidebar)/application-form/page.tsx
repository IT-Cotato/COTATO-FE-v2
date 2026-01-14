import {AdminApplicationFormContainer} from '@/app/admin/(with-sidebar)/application-form/_containers/AdminApplicationFormContainer';
import {AdminRecruitmentInformationContainer} from '@/app/admin/(with-sidebar)/application-form/_containers/AdminRecruitmentInformationContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminApplicationFormPage() {
  return (
    <section className='flex flex-col gap-6'>
      <h1 className='text-h4'>모집 기간</h1>
      <SuspenseWrapper>
        <AdminRecruitmentInformationContainer />
        <AdminApplicationFormContainer />
      </SuspenseWrapper>
    </section>
  );
}
