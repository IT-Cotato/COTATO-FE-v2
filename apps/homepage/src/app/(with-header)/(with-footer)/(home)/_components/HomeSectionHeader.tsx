'use client';

interface HomeSectionHeaderProps {
  mainHeading: string;
  subHeading: string;
}

export const HomeSectionHeader = ({
  mainHeading,
  subHeading,
}: HomeSectionHeaderProps) => {
  return (
    <div className='flex flex-col items-center gap-2 lg:gap-5'>
      <p className='text-body-l lg:text-h3 text-neutral-500'>{mainHeading}</p>

      <h2 className='text-h5 lg:text-h2 font-bold text-neutral-800'>
        {subHeading}
      </h2>
    </div>
  );
};
