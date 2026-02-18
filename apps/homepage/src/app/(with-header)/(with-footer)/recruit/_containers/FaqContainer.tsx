import {useState} from 'react';
import {FaqSideBar} from '@/app/(with-header)/(with-footer)/recruit/_components/FaqSideBar';
import {FaqAccordion} from '@/app/(with-header)/(with-footer)/recruit/_components/FaqAccordion';
import {Button} from '@repo/ui/components/buttons/Button';
import {faqParametersType} from '@/schemas/faq/faq.schema';
import {FAQ_BY_TYPE} from '@/constants/faq/faq';

export const FaqContainer = () => {
  const [isActive, setIsActive] = useState<faqParametersType>('COMMON');
  const faqData = FAQ_BY_TYPE[isActive];

  return (
    <div className='flex flex-col gap-30'>
      <div className='flex flex-col gap-17.5'>
        <p className='text-h2 text-center text-neutral-800'>FAQ</p>
        <div className='flex gap-22 px-8.75'>
          <FaqSideBar ActivatedMenu={isActive} onActive={setIsActive} />
          <div className='flex flex-1 flex-col gap-6.25'>
            {faqData.map((item) => (
              <FaqAccordion key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className='text-h4 mb-4 text-center text-neutral-600'>
          더 자세한 궁금한 내용이 있다면?
        </p>
        <Button
          label='카카오톡 채널 문의하기'
          labelTypo='h3'
          width={393}
          height={74}
          backgroundColor='primary'
          textColor='neutral-50'
          onClick={() => window.open('https://pf.kakao.com/_LQLyG', '_blank')}
        />
      </div>
    </div>
  );
};
