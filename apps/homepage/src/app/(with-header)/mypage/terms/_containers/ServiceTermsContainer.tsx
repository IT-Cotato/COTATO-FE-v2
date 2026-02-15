import {ServiceTerms} from '@/app/(with-header)/mypage/terms/_components/ServiceTerms';

export const ServiceTermsContainer = () => {
  return (
    <div className='terms-scrollbar flex h-183.75 min-w-275 overflow-y-auto rounded-[10px] border-2 border-neutral-200'>
      <ServiceTerms />
    </div>
  );
};
