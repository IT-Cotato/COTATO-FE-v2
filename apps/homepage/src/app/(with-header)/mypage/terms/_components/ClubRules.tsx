import {CLUB_RULES} from '@/constants/mypage-mem/term/ClubRulesData';

export const ClubRules = () => {
  return (
    <div className='flex h-full w-full flex-col items-start gap-5 px-5 py-5 text-neutral-800 lg:px-10 lg:py-[38.5px]'>
      <h4 className='text-h5 lg:text-h4 font-bold'>
        IT 연합 동아리 코테이토 회칙
        <br />
        [2026.03.04 최종수정자 임준서]
      </h4>
      {CLUB_RULES.map((section) => (
        <div key={section.title} className='flex flex-col gap-1'>
          <span className='text-body-l-b lg:text-body-l-sb'>
            {section.title}
          </span>
          {section.content}
        </div>
      ))}
      <div className='h-0.5 w-full shrink-0 lg:h-[38.5px]' aria-hidden='true' />
    </div>
  );
};
