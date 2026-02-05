interface ProjectSectionProps {
  generation?: string;
}

export const ProjectSection = ({generation}: ProjectSectionProps) => {
  return (
    <div className='flex w-full flex-col items-center gap-7.5 py-7.5'>
      <h2 className='text-h2 text-neutral-700'>
        {generation ? `${generation} 프로젝트` : '모든 프로젝트'}
      </h2>
      <div className='grid grid-cols-3 gap-5'>PROJECTS</div>
    </div>
  );
};
