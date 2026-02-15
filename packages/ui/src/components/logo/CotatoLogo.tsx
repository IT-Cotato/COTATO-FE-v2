import MainLogo from '../../assets/main-logo/main-logo.svg';

export const CotatoLogo = () => {
  return (
    <div className='flex flex-col items-center gap-9.5'>
      <p className='text-h4 bg-linear-to-r from-[#F89202] via-[#F89202] to-[#9E9E9E] bg-clip-text whitespace-nowrap text-transparent'>
        COde Together, Arrive TOgether
      </p>
      <MainLogo role='img' aria-label='COTATO 로고' className='h-auto w-auto' />
    </div>
  );
};
