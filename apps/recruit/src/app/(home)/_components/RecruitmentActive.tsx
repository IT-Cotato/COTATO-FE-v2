'use client';

import {useState} from 'react';
import Image from 'next/image';
import {Button} from '@repo/ui/components/buttons/Button';
import {LoginModal} from '@/components/modal/LoginModal';
import {useRecruitmentApply} from '@/hooks/useRecruitmentApply';

interface RecruitmentActiveProps {
  generation: number | null | undefined;
}

export const RecruitmentActive = ({generation}: RecruitmentActiveProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    notices,
    hasSubmitted,
    isStarting,
    isStatusLoading,
    isScheduleLoading,
    isScheduleError,
    isInPeriod,
    isAfterEnd,
    handleApplyClick,
  } = useRecruitmentApply({onLoginRequired: () => setIsModalOpen(true)});

  return (
    <>
      <section className='relative flex min-h-[calc(100dvh-50px)] w-full flex-1 flex-col items-center justify-center overflow-hidden bg-black px-6 py-12.5 lg:min-h-[calc(100dvh-88px)] lg:py-16'>
        <Image
          src='/background/background.svg'
          alt='배경 이미지'
          fill
          priority
          className='object-cover object-center'
        />
        <div className='relative z-10 flex w-full max-w-240 flex-col gap-5'>
          <h1 className='text-h3 lg:text-h4 text-white'>
            🥔 코테이토 {generation}기 지원서 🥔
          </h1>
          <div className='flex flex-col gap-4.5 rounded-[10px] bg-white p-5 lg:gap-8 lg:px-20.5 lg:pt-11 lg:pb-21'>
            <h4 className='text-h5 lg:text-h4 font-bold text-black'>
              ⚠️ 지원 전 유의 사항 ⚠️
            </h4>

            <ul className='list-disc space-y-2.5 pl-5 text-neutral-800 marker:text-[10px] lg:space-y-3 lg:pl-6'>
              {notices.map((notice, index) => (
                <li key={index} className='text-body-l leading-relaxed'>
                  {notice}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex w-full md:justify-end'>
            <Button
              label={
                isStatusLoading || isScheduleLoading
                  ? '로딩 중...'
                  : isScheduleError
                    ? '오류 발생'
                    : !isInPeriod
                      ? isAfterEnd
                        ? '모집 마감'
                        : '모집 예정'
                      : hasSubmitted
                        ? '제출 완료'
                        : '지원하기'
              }
              onClick={handleApplyClick}
              width='100%'
              wrapperClassName='w-full lg:w-[313px]'
              disabled={
                hasSubmitted ||
                isStarting ||
                isStatusLoading ||
                !isInPeriod ||
                isScheduleLoading
              }
            />
          </div>
        </div>
      </section>

      <LoginModal
        title='로그인 후 이용할 수 있는 서비스입니다.'
        content='지원서 작성을 위해 로그인을 해주세요!'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
