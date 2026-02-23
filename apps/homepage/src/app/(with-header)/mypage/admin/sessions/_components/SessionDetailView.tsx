import {SessionData} from '@/schemas/admin/session.schema';

interface SessionDetailViewProps {
  session: SessionData;
}

export const SessionDetailView = ({session}: SessionDetailViewProps) => {
  return (
    <div className='flex w-full flex-col gap-3.75 rounded-[10px] bg-white px-8.5 py-9'>
      <div className='flex flex-col gap-1'>
        <p className='text-h5 text-neutral-400'>{session.generation}</p>
        <p className='text-h3 text-neutral-800'>{session.title}</p>
      </div>
      <div className='h-px w-full shrink-0 bg-neutral-200' />
      <div className='flex gap-10'>
        <div className='flex flex-col gap-1'>
          <p className='text-h5 text-neutral-400'>세션 설명</p>
          <p className='text-h4 text-neutral-600'>{session.description}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-h5 text-neutral-400'>세션 장소</p>
          <p className='text-h4 text-neutral-600'>
            {session.placeName
              ? `${session.placeName}${session.detailAddress ? ` ${session.detailAddress}` : ''}`
              : '온라인 세션'}
          </p>
        </div>
      </div>
    </div>
  );
};
