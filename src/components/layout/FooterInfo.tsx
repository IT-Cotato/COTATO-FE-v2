import MainLogo from '@/assets/main-logo/main-logo.svg';

export const FooterInfo = () => {
  return (
    <div className='flex w-fit flex-col gap-3.5'>
      <p className='text-body-s text-white'>IT 연합동아리 COTATO</p>
      <MainLogo className='w-49.25' />
    </div>
  );
};
