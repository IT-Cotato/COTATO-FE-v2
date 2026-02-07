import {ProjectDetail} from '@/schemas/project/project.schema';
import LinkIcon from '@/assets/link/link.svg';

export const ProjectDetailHeader = ({data}: {data: ProjectDetail}) => (
  <header className='flex flex-col gap-3.75'>
    <div className='flex gap-4.5 text-center'>
      <span className='bg-disabled text-body-m h-7.5 w-17.75 rounded-[5px] p-1.25 text-white'>
        {data.generationId}기
      </span>
      <span className='bg-primary text-body-m h-7.5 w-17.75 rounded-[5px] p-1.25 text-white'>
        {data.projectType === 'DEMODAY' ? '데모데이' : '해커톤'}
      </span>
    </div>
    <div className='flex items-center gap-4.5'>
      <h1 className='text-h1 text-neutral-800'>{data.projectName}</h1>
      <a
        href={data.projectLink}
        target='_blank'
        rel='noopener noreferrer'
        className='shadow-default flex items-center gap-2.5 rounded-[10px] px-3.75 py-2.25 text-neutral-400'>
        <span className='text-h5'>LINK</span>
        <LinkIcon className='h-5 w-5 text-neutral-400' />
      </a>
    </div>
  </header>
);
