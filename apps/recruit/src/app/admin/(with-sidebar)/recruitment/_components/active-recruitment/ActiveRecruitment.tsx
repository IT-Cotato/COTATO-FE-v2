import {ActiveRecruitmentForm} from '@/app/admin/(with-sidebar)/recruitment/_components/active-recruitment/ActiveRecruitmentForm';

export const ActiveRecruitment = () => {
  return (
    <section className='flex w-full flex-col gap-2.5 lg:gap-5'>
      <h2 className='text-h5 lg:text-h4 font-bold'>모집 활성화</h2>
      <ActiveRecruitmentForm />
    </section>
  );
};
