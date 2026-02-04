import BackgroundKeycap from '@/assets/backgrounds/banner/background-keycap.svg';
import MainLogo from '@/assets/main-logo/main-logo.svg';
import MainArrowIcon from '@/assets/home/main-arrow-icon.svg';

export const HomeBanner = () => {
  return (
    <div className='group relative flex w-full items-center justify-center overflow-hidden bg-black'>
      <BackgroundKeycap className='object-cover transition-all duration-500 group-hover:translate-y-4' />

      <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-50'></div>

      <div className='absolute top-82.5 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div className='flex flex-col items-center gap-9.5'>
          <p className='text-h4 bg-linear-to-r from-[#F89202] from-0% via-[#F89202] via-10% to-[#9E9E9E] to-100% bg-clip-text text-transparent'>
            COde Together, Arrive TOgether
          </p>
          <MainLogo />
        </div>

        <div className='absolute top-110'>
          <MainArrowIcon />
        </div>
      </div>
    </div>
  );
};
