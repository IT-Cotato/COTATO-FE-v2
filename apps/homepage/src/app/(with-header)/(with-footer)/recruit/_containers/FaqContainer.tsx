'use client';

import {useState} from 'react';
import {FaqSideBar} from '@/app/(with-header)/(with-footer)/recruit/_components/FaqSideBar';
import {FaqAccordion} from '@/app/(with-header)/(with-footer)/recruit/_components/FaqAccordion';
import {faqParametersType} from '@/schemas/faq/faq.schema';
import {useFaqQuery} from '@/hooks/queries/useFaq.query';

export const FaqContainer = () => {
  const [isActive, setIsActive] = useState<faqParametersType>('COMMON');
  const {data} = useFaqQuery(isActive);

  return (
    <div className='px-6 py-12.5 lg:px-0 lg:py-0'>
      <p className='text-h2 mb-17.5 hidden text-center text-neutral-800 lg:block'>
        FAQ
      </p>

      <div className='mx-auto mb-12.5 flex max-w-5xl flex-col gap-7.5 lg:mb-30 lg:flex-row lg:gap-17.5'>
        <FaqSideBar activatedMenu={isActive} onActive={setIsActive} />
        <div className='flex flex-1 flex-col gap-6.25'>
          {data?.map((item) => (
            <FaqAccordion key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <p className='text-body-l lg:text-h4 mb-4 text-center text-neutral-600'>
          더 자세한 궁금한 내용이 있다면?
        </p>
        <button
          className='text-body-l-b lg:text-h3 bg-primary h-10.5 w-full rounded-[20px] p-2.5 text-neutral-800 lg:h-18.5 lg:w-75.75 lg:rounded-[10px] lg:p-0 lg:text-neutral-50'
          onClick={() =>
            window.open(
              'https://pf.kakao.com/_LQLyG',
              '_blank',
              'noopener,noreferrer'
            )
          }>
          카카오톡 채널 문의하기
        </button>
      </div>
    </div>
  );
};
