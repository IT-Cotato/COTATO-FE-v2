import {AdminApplicationForm} from '@/app/admin/(with-sidebar)/application-form/_components/form/AdminApplicationForm';
import {AdminApplicationFormControl} from '@/app/admin/(with-sidebar)/application-form/_components/form/AdminApplicationFormControl';
import {AdminApplicationFormHeader} from '@/app/admin/(with-sidebar)/application-form/_components/form/AdminApplicationFormHeader';
import {AdminRecruitmentInformation} from '@/app/admin/(with-sidebar)/application-form/_components/recruitment/AdminRecruitmentInformation';

export default function AdminApplicationFormPage() {
  return (
    <section className='flex flex-col gap-6'>
      <AdminApplicationFormHeader />
      <AdminRecruitmentInformation />
      <AdminApplicationFormControl />
      <AdminApplicationForm />
    </section>
  );
}
