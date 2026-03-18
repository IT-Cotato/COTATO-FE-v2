import {POSITION_LABEL} from '@/constants/project/project-detail';
import {Position, ProjectDetail} from '@/schemas/project/project.schema';

interface ProjectInfoMobileProps {
  data: ProjectDetail;
  positions: Position[];
  groupedMembers: Record<Position, string[]>;
}

export const ProjectInfoMobile = ({
  data,
  positions,
  groupedMembers,
}: ProjectInfoMobileProps) => (
  <div className='flex flex-col gap-3'>
    <section>
      <h2 className='text-h5 mb-3 font-bold text-neutral-800'>프로젝트 기간</h2>
      <p className='text-body-l px-2.5 text-neutral-500'>
        {data.startDate.replace(/-/g, '.')} - {data.endDate.replace(/-/g, '.')}
      </p>
    </section>
    <section>
      <h2 className='text-h5 mb-3 font-bold text-neutral-800'>팀 구성</h2>
      <div className='flex flex-col gap-3 px-2.5'>
        {positions.map((pos) => (
          <div key={pos} className='flex'>
            <span className='text-body-l-b w-27.25 text-neutral-400'>
              {POSITION_LABEL[pos]}
            </span>
            <div className='flex flex-1 flex-wrap gap-x-4.5 gap-y-1'>
              {groupedMembers[pos].map((name, i) => (
                <span key={i} className='text-body-l text-neutral-800'>
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);
