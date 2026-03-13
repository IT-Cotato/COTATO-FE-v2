import {
  SERVICE_TERMS,
  SERVICE_TERMS_INTRO,
} from '@/constants/mypage-mem/term/ServiceTermsData';

export const ServiceTerms = () => {
  return (
    <div className='flex h-full w-full flex-col items-start gap-5 px-5 py-5 text-neutral-800 lg:px-10 lg:py-[38.5px]'>
      <h4 className='text-h5 lg:text-h4 font-bold'>
        코테이토(COTATO) 서비스 이용약관
      </h4>
      <div className='text-body-l flex flex-col lg:pb-2'>
        {SERVICE_TERMS_INTRO.content}
      </div>
      {SERVICE_TERMS.map((section) => (
        <div key={section.title} className='flex flex-col gap-1'>
          <span className='text-body-l-b lg:text-body-l-sb'>
            {section.title}
          </span>
          {section.content}
        </div>
      ))}
      <div className='w-full shrink-0 lg:h-[38.5px]' aria-hidden='true' />
    </div>
  );
};
