import {PRIVACY_POLICY} from '@/constants/mypage-mem/termsData';

export const PrivacyPolicy = () => {
  return (
    <div className='flex h-full w-full flex-col items-start gap-5 py-[33px] pl-[40px] text-neutral-800'>
      <h4 className='text-h4'>코테이토(COTATO) 개인정보 처리방침</h4>
      {PRIVACY_POLICY.map((section) => (
        <div key={section.title} className='flex flex-col gap-1 pl-[17px]'>
          <span className='text-body-l-sb'>{section.title}</span>
          {section.content}
        </div>
      ))}
      <div className='h-[38.5px] w-full flex-shrink-0' aria-hidden='true' />
    </div>
  );
};
