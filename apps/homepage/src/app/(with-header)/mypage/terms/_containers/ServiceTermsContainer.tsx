import {ServiceTerms} from '@/app/(with-header)/mypage/terms/_components/ServiceTerms';

export const ServiceTermsContainer = () => {
  return (
    <div className='no-scrollbar lg:terms-scrollbar flex h-153.25 overflow-y-auto rounded-[10px] border-2 border-neutral-200 lg:h-183.75 lg:min-w-275'>
      <ServiceTerms />
    </div>
  );
};
