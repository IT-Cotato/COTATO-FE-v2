import SmallLogo from '@/assets/small-logo/small-logo.svg';
import Image from 'next/image';

interface AboutUsManagementTeamCardProps {
  title: string;
  description: string[];
}

export const AboutUsManagementTeamCard = ({
  title,
  description,
}: AboutUsManagementTeamCardProps) => {
  return (
    <div className='group relative h-93.5 w-67.5 cursor-pointer overflow-hidden'>
      <div className='absolute inset-0 transition-opacity duration-300 group-hover:opacity-0'>
        <Image
          src='/keycap/management-background.svg'
          alt='background'
          fill
          className='object-cover'
        />
      </div>

      <div className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <Image
          src='/keycap/management-background-hover.svg'
          alt='background'
          fill
          className='object-cover'
        />
      </div>

      <div className='absolute inset-0 flex flex-col items-center justify-between p-10'>
        <div className='flex flex-col items-center gap-2'>
          <SmallLogo className='group-hover:text-primary h-6.25 w-6.25 text-white transition-colors duration-300' />
          <span className='text-h3 text-white'>{title}</span>
        </div>

        <div className='flex flex-col gap-4.25 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          {description.map((line, index) => (
            <div key={index} className='flex items-start gap-2'>
              <span className='mt-2 h-1 w-1 shrink-0 rounded-full bg-white' />
              <p className='text-body-l text-white'>{line}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
