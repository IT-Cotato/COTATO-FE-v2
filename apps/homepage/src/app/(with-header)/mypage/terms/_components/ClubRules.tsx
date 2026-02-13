import {CLUB_RULES} from '@/constants/mypage-mem/termsData';

export const ClubRules = () => {
  return (
    <div className='flex h-full w-full flex-col items-start gap-5 py-[38.5px] pl-[40px] text-neutral-800'>
      <h4 className='text-h4'>
        IT 연합 동아리 코테이토 회칙
        <br />
        [2025.09.05 최종수정자 정찬민]
      </h4>
      {CLUB_RULES.map((section) => (
        <div key={section.title} className='flex flex-col gap-1'>
          <span className='text-body-l-sb'>{section.title}</span>
          {section.content}
        </div>
      ))}
      <div className='h-[38.5px] w-full flex-shrink-0' aria-hidden='true' />
    </div>
  );
};
