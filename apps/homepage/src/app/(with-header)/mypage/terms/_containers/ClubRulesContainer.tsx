import {ClubRules} from '@/app/(with-header)/mypage/terms/_components/ClubRules';

export const ClubRulesContainer = () => {
  return (
    <div className='terms-scrollbar flex h-183.75 min-w-275 overflow-y-auto rounded-[10px] border-2 border-neutral-200'>
      <ClubRules />
    </div>
  );
};
