import {ProjectDetail, Position} from '@/schemas/project/project.schema';
import {POSITION_LABEL} from '@/constants/project/project-detail';

interface InfoProps {
  data: ProjectDetail;
  groupedMembers: Record<Position, string[]>;
  positions: Position[];
}

export const ProjectDetailInfo = ({
  data,
  groupedMembers,
  positions,
}: InfoProps) => (
  <section className='flex gap-48'>
    <div className='flex shrink-0 flex-col gap-7.5'>
      <div className='flex w-94.75 gap-9'>
        <div className='text-h5 w-[171.5px] text-neutral-800'>
          프로젝트 기간
        </div>
        <div className='text-body-l flex gap-4 text-neutral-600'>
          <p>{data.startDate.replace(/-/g, '.')}</p>
          <p>-</p>
          <p>{data.endDate.replace(/-/g, '.')}</p>
        </div>
      </div>
      <div className='flex gap-19.25'>
        <div className='text-h5 text-neutral-800'>팀 구성</div>
        <div className='flex flex-1 flex-col items-start gap-2.25'>
          {positions.map((pos) => (
            <div key={pos} className='grid grid-cols-[108px_1fr] items-center'>
              <span className='text-body-l-sb text-neutral-400'>
                {POSITION_LABEL[pos]}
              </span>
              <div className='flex w-36.75 shrink-0 items-center gap-4.5'>
                {groupedMembers[pos].map((name, index) => (
                  <span
                    key={index}
                    className='text-body-l whitespace-nowrap text-neutral-800'>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className='flex flex-1 gap-6.5'>
      <div className='text-h5 w-22.25 shrink-0 text-neutral-800'>
        프로젝트 소개
      </div>
      <div className='text-h5 custom-scrollbar max-h-42.75 flex-1 overflow-y-auto rounded-[10px] bg-neutral-50 px-3.5 py-2.5 text-neutral-600'>
        {data.projectIntroduction}
      </div>
    </div>
  </section>
);
