'use client';

import {useParams} from 'next/navigation';
import Image from 'next/image';
import {PROJECT_DETAIL_MOCK} from '@/mocks/project/mock-project';
import {POSITION_LABEL} from '@/constants/project/project-detail';
import {Position, ProjectDetail} from '@/schemas/project/project.schema';
import LinkIcon from '@/assets/link/link.svg';

export const ProjectDetailContainer = () => {
  const params = useParams();
  const projectId = params?.projectId;
  const data = (PROJECT_DETAIL_MOCK[Number(projectId)] ||
    PROJECT_DETAIL_MOCK[1]) as ProjectDetail; // 일단 상세 목데이터 없는 id면 트러블로그 목데이터 뜨게

  const groupedMembers = data.members.reduce(
    (acc, member) => {
      const pos = member.position;
      if (!acc[pos]) acc[pos] = [];
      acc[pos].push(member.name);
      return acc;
    },
    {} as Record<Position, string[]>
  );

  const positions: Position[] = ['PM', 'DE', 'FE', 'BE'];

  return (
    <main className='flex w-275 flex-col py-7.5'>
      <div className='flex flex-col gap-15.25'>
        <div className='flex flex-col gap-10.75'>
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
                    <div
                      key={pos}
                      className='grid grid-cols-[108px_1fr] items-center'>
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
        </div>
        <section className='flex w-full flex-col'>
          {data.imageInfos.map((img) => (
            <Image
              key={img.s3Key}
              src={img.publicUrl}
              alt='project-img'
              width={0}
              height={0}
              sizes='1100px'
              style={{width: '100%', height: 'auto'}} // 원본 비율 유지하며 가로 꽉 차게
            />
          ))}
        </section>
      </div>
    </main>
  );
};
