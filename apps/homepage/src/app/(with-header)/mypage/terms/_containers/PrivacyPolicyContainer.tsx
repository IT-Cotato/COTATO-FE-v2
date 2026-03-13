import {PrivacyPolicy} from '@/app/(with-header)/mypage/terms/_components/PrivacyPolicy';

export const PrivacyPolicyContainer = () => {
  return (
    <div className='no-scrollbar lg:terms-scrollbar flex overflow-y-auto rounded-[10px] border-2 border-neutral-200 lg:h-183.75 lg:min-w-275'>
      <PrivacyPolicy />
    </div>
  );
};
