interface HomeSectionHeaderProps {
  mainHeading: string;
  subHeading: string;
}

export const HomeSectionHeader = ({
  mainHeading,
  subHeading,
}: HomeSectionHeaderProps) => {
  return (
    <div className='flex flex-col items-center gap-5'>
      <p className='text-h3 text-neutral-500'>{mainHeading}</p>
      <h2 className='text-h2 text-neutral-800'>{subHeading}</h2>
    </div>
  );
};
