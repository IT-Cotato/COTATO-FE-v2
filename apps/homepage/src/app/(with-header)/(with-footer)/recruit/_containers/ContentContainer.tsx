'use client';

import Image from 'next/image';
import {useState} from 'react';
import {QUALIFICATIONS_CARD_ITEMS} from '@/constants/recruitment/recruitment-components';
import {QualificationsCard} from '@/app/(with-header)/(with-footer)/recruit/_components/QualificationsCard';
import {PositionCard} from '@/app/(with-header)/(with-footer)/recruit/_components/PositionCard';
import {ActivityCard} from '@/app/(with-header)/(with-footer)/recruit/_components/ActivityCard';
import {FaqSideBar} from '@/app/(with-header)/(with-footer)/recruit/_components/FaqSideBar';
import {FaqAccordion} from '@/app/(with-header)/(with-footer)/recruit/_components/FaqAccordion';
import {
  POSITION_CARD_DATA,
  ACTIVITY_CARD_DATA,
} from '@/constants/recruitment/recruitment-notice';
import {Button} from '@repo/ui/components/buttons/Button';
import {faqParametersType} from '@/schemas/faq/faq.schema';
import {FAQ_BY_TYPE} from '@/constants/faq/faq';

export const ContentContainer = () => {
  const [isActive, setIsActive] = useState<faqParametersType>('COMMON');
  const faqData = FAQ_BY_TYPE[isActive];

  return (
    <div className='relative min-w-360 overflow-hidden'>
      {/* dimd */}
      <div className='absolute h-271.25 w-full bg-linear-to-b from-[#010101] from-20% to-transparent to-100%' />

      {/* object */}
      <Image
        src='/images/recruitment/recruitment-background-object-1.webp'
        alt=''
        aria-hidden={true}
        draggable={false}
        width={817}
        height={1052}
        className='absolute top-144.25 left-0'
      />
      <Image
        src='/images/recruitment/recruitment-background-object-2.webp'
        alt=''
        aria-hidden={true}
        draggable={false}
        width={817}
        height={1052}
        className='absolute top-401.25 right-0'
      />

      {/* content */}
      <div className='relative z-1 m-auto flex w-360 flex-col gap-45 px-30.25 pt-73 pb-23'>
        <div className='flex flex-col gap-12.5'>
          <div className='flex flex-col gap-2.5'>
            <p className='text-h4 text-center text-white'>
              막연함이 확신으로 변하는 시간, 혼자가 아닌 &apos;우리&apos;의
              코드로 도달하는 성장의 종착지
            </p>
            <p className='text-h4 text-center text-white'>
              혼자 고민하던 시간은 뒤로하고, 협업의 밀도 속에서 진짜 프로젝트를
              경험하세요.
            </p>
          </div>
          <div className='flex justify-center gap-20'>
            {QUALIFICATIONS_CARD_ITEMS.map((item) => (
              <QualificationsCard key={item.qualification} item={item} />
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-12.5'>
          <p className='text-h2 text-center text-neutral-800'>모집 파트</p>
          <div className='flex justify-center gap-4.5'>
            {POSITION_CARD_DATA.map((item) => (
              <PositionCard key={item.short} item={item} />
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-12.5'>
          <div className='flex flex-col'>
            <p className='text-h2 mb-2.5 text-center text-neutral-800'>
              주요 활동 일정
            </p>
            <p className='text-h5 mb-1 text-center text-neutral-600'>
              정기 세션은 <span className='text-primary'>매주 금요일 19시</span>
              에&nbsp;<span className='text-primary'>오프라인</span>으로
              진행됩니다
            </p>
            <p className='text-body-l mb-7.5 text-center text-neutral-500'>
              세부 일정은 추후 변경될 수 있습니다.
            </p>
          </div>

          <div className='flex flex-wrap justify-center gap-x-5 gap-y-6'>
            {ACTIVITY_CARD_DATA.map((item) => (
              <ActivityCard key={item.id} item={item} />
            ))}
          </div>
        </div>

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
              onClick={() =>
                window.open('https://pf.kakao.com/_LQLyG', '_blank')
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
