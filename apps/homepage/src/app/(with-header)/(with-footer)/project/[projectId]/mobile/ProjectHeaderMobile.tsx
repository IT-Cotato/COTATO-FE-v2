import {ProjectDetail} from '@/schemas/project/project.schema';
import LinkIcon from '@/assets/link/link.svg';

export const ProjectHeaderMobile = ({
  data,
  hasLink,
  normalizedLink,
}: {
  data: ProjectDetail;
  hasLink: boolean;
  normalizedLink: string;
}) => (
  <div className='flex flex-col gap-5'>
    <div className='flex gap-4.5' role='group' aria-label='프로젝트 분류 정보'>
      <span className='bg-disabled text-body-m flex h-7.5 w-17.75 items-center justify-center rounded-[5px] font-bold text-white'>
        {data.generationId}기
      </span>
      <span className='bg-primary text-body-m flex h-7.5 w-17.75 items-center justify-center rounded-[5px] font-bold text-white'>
        {data.projectType === 'DEMODAY' ? '데모데이' : '해커톤'}
      </span>
    </div>
    <div className='flex items-center justify-start gap-4.5'>
      <h1 className='text-h3 text-neutral-800'>{data.name}</h1>
      {hasLink && (
        <a
          href={normalizedLink}
          target='_blank'
          rel='noopener noreferrer'
          className='shadow-default flex items-center gap-1 rounded-sm p-2.75 text-neutral-400'>
          <span className='text-body-m font-bold'>LINK</span>
          <LinkIcon className='h-4.5 w-4.5' />
        </a>
      )}
    </div>
  </div>
);
