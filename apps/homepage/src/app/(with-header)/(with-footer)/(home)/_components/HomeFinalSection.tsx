'use client';

import {Button} from '@repo/ui/components/buttons/Button';

export const HomeFinalSection = () => {
  const handleApplyClick = () => {
    window.open('https://recruit.cotato.kr/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='bg-red flex flex-col items-center gap-10'>
      <div className='flex flex-col items-center gap-6'>
        <p className='text-h4 text-neutral-600'>
          코테이토와 당신의 여정을 함께하세요!
        </p>
        <h2 className='text-h2 text-neutral-800'>
          코테이토에서 함께할 신입 감자들을 찾습니다!
        </h2>
      </div>
      <Button
        label='지원서 작성하기'
        width={349}
        labelTypo='h3'
        onClick={handleApplyClick}
        className='hover:bg-hover transition-all duration-300 hover:shadow-[0_4px_40px_0_rgba(255,255,255,0.80)]'
      />
    </div>
  );
};
