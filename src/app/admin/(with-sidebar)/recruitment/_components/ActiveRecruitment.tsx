import {ActiveRecruitmentForm} from './ActiveRecruitmentForm';

export const ActiveRecruitment = () => {
  return (
    <section className='flex w-full max-w-244 flex-col gap-7'>
      <h2 className='h-11.5 text-h4'>모집 활성화</h2>
      <ActiveRecruitmentForm />
    </section>
  );
};
