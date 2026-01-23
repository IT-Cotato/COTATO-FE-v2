import {ActiveRecruitmentForm} from '@/app/admin/recruitment/_components/active-recruitment/ActiveRecruitmentForm';

export const ActiveRecruitment = () => {
  return (
    <section className='flex w-full flex-col gap-5'>
      <h2 className='text-h4'>모집 활성화</h2>
      <ActiveRecruitmentForm />
    </section>
  );
};
