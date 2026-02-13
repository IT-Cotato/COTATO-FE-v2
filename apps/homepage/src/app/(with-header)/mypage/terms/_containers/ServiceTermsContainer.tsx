import {ServiceTerms} from '@/app/(with-header)/mypage/terms/_components/ServiceTerms';

export const ServiceTermsContainer = () => {
  return (
    <div className='terms-scrollbar flex h-[735px] min-w-[1100px] overflow-y-auto rounded-[10px] border-[2px] border-neutral-200'>
      <ServiceTerms />
    </div>
  );
};
