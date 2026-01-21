import {PlusButton} from '@/app/admin/recruitment/_components/add-generation/PlusButton';

export const AddGenerationContainer = () => {
  return (
    <div className='flex w-full flex-col items-start gap-[10px] self-stretch rounded-[10px] bg-neutral-100 px-8 py-3'>
      <div className='flex items-center gap-[23px] self-stretch'>
        <p className='shrink-0 text-body-l text-neutral-600'>기수 추가하기</p>
        <div className='scrollbar-hide flex items-center gap-2.5 overflow-x-auto'>
          <PlusButton />
          {[11, 12, 13, 14, 15, 16, 17, 18, 19].map((gen) => (
            <button
              key={gen}
              className='flex h-[38px] w-[63px] shrink-0 items-center justify-center rounded-[5px] bg-white text-body-l font-bold text-neutral-600'>
              {gen}기
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
