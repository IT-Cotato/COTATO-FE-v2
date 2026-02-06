import Image from 'next/image';

interface ProjectCardProps {
  name: string;
  shortDescription: string;
  projectType: string;
  generationId: number;
  thumbnailUrl: string;
}

export const ProjectCard = ({
  name,
  shortDescription,
  projectType,
  generationId,
  thumbnailUrl,
}: ProjectCardProps) => {
  return (
    <div className='flex flex-col gap-2.75'>
      <div className='relative h-50 w-82.5 overflow-hidden rounded-t-[20px] bg-white'>
        <Image src={thumbnailUrl} alt={name} fill className='object-cover' />
      </div>
      <div className='flex flex-col gap-2 p-[0_15px_8px_15px]'>
        <div className='flex items-center justify-between'>
          <h3 className='text-h4 text-neutral-800'>{name}</h3>
          <div className='flex h-6 gap-2.5'>
            <span className='text-body-s bg-disabled rounded-[5px] px-2.5 py-0.5 text-white'>
              {generationId}기
            </span>
            <span className='bg-primary text-body-s shadow-default rounded-[5px] px-2 py-0.5 text-white'>
              {projectType === 'DEMODAY' ? '데모데이' : '해커톤'}
            </span>
          </div>
        </div>
        <p className='text-body-m line-clamp-1 text-neutral-600'>
          {shortDescription}
        </p>
      </div>
    </div>
  );
};
