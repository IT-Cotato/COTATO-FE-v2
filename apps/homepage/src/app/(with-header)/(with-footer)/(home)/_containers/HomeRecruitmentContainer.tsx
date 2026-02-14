'use client';

import {ROUTES} from '@/constants/routes';
import {useRecruitmentsStatus} from '@/hooks/queries/useRecruitments.query';
import {Button} from '@repo/ui/components/buttons/Button';
import {useRouter} from 'next/navigation';

export const HomeRecruitmentContainer = () => {
  const router = useRouter();
  const {data} = useRecruitmentsStatus();

  const isRecruiting =
    data?.isRecruitingActive || data?.isAdditionalRecruitmentActive;

  const handleButtonClick = () => {
    if (isRecruiting) {
      // 모집 중일 때: 외부 지원 사이트 오픈
      window.open(
        'https://recruit.cotato.kr/',
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      // 모집 중이 아닐 때: 내부 /recruit 페이지로 이동
      router.push(ROUTES.RECRUIT);
    }
  };

  return (
    <div className='bg-red flex flex-col items-center gap-10'>
      <div className='flex flex-col items-center gap-6'>
        <p className='text-h4 text-neutral-600'>
          코테이토와 당신의 여정을 함께하세요!
        </p>
        <h2 className='text-h2 text-neutral-800'>
          코테이토에서 함께할 신입 감자분들을 모집합니다.
        </h2>
      </div>
      <Button
        label={isRecruiting ? '지원서 작성하기' : '알림 신청 바로가기'}
        width={349}
        labelTypo='h3'
        onClick={handleButtonClick}
        className='hover:bg-hover transition-all duration-300 hover:shadow-[0_4px_40px_0_rgba(255,255,255,0.80)]'
      />
    </div>
  );
};
