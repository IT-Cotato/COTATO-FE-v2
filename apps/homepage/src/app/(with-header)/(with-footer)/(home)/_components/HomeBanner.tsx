import MainLogo from '@/assets/main-logo/main-logo.svg';
import MainArrowIcon from '@/assets/home/main-arrow-icon.svg';
import Image from 'next/image';
export const HomeBanner = () => {
  return (
    <div className='group relative flex h-278.5 w-full items-center justify-center bg-black'>
      <div className='relative flex w-full justify-center overflow-hidden transition-all duration-500 group-hover:translate-y-4'>
        <Image
          src='/keycap/background-keycap.svg'
          alt='background'
          width={1440}
          height={919}
          className='object-cover'
          priority
        />
      </div>

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
