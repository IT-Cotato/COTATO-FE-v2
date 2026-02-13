import {PrivacyPolicy} from '@/app/(with-header)/mypage/terms/_components/PrivacyPolicy';

export const PrivacyPolicyContainer = () => {
  return (
    <div className='terms-scrollbar flex h-[735px] min-w-[1100px] overflow-y-auto rounded-[10px] border-[2px] border-neutral-200'>
      <PrivacyPolicy />
    </div>
  );
};
