import {SERVICE_TERMS} from '@/constants/mypage-mem/termsData';

export const ServiceTerms = () => {
  return (
    <div className='flex h-full w-full flex-col items-start gap-5 py-[38.5px] pl-[40px] text-neutral-800'>
      {SERVICE_TERMS.map((section) => (
        <div key={section.title} className='flex flex-col gap-1'>
          <span className='text-body-l-sb'>{section.title}</span>
          {section.content}
        </div>
      ))}
      <div className='h-[38.5px] w-full flex-shrink-0' aria-hidden='true' />
    </div>
  );
};
