'use client';

import {FaqAccordion} from '@/app/faq/_components/FaqAccordion';
import {useFaqQuery} from '@/hooks/queries/useFaq.query';
import {useSearchParams} from 'next/navigation';
import {FAQ_TYPE_MAP} from '@/constants/faq/faq';

export const FaqAccordionList = () => {
  const searchParams = useSearchParams();
  const rawType = searchParams.get('faq');
  const activatedType =
    rawType && rawType in FAQ_TYPE_MAP
      ? (rawType as keyof typeof FAQ_TYPE_MAP)
      : 'common';
  const {data} = useFaqQuery(FAQ_TYPE_MAP[activatedType]);

  return (
    <div className='flex flex-col gap-6.25'>
      {data?.map((item) => (
        <FaqAccordion key={item.id} item={item} />
      ))}
    </div>
  );
};
