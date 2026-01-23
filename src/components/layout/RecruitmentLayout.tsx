'use client';

import Image, {StaticImageData} from 'next/image';
import CountdownTimer from '@/components/layout/CountdownTimer';
import clsx from 'clsx';
import {HEADER_HEIGHT} from '@/constants/ui';
import {NotifyInput} from '@/components/layout/NotifyInput';
import {Button} from '@/components/button/Button';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import {useRouter} from 'next/navigation';

type bgColorKey = 'bg-transparent' | 'bg-neutral-50' | 'bg-black';

interface RecruitmentLayoutProps {
  statusText: string;
  descriptionText: string;
  activateNotifyInput?: boolean;
  activateApplyButton?: boolean;
  bgColor?: bgColorKey;
  bgImage?: StaticImageData;
  bottomBannerBgImage?: StaticImageData;
}

export default function RecruitmentLayout({
  statusText,
  descriptionText,
  activateNotifyInput = false,
  activateApplyButton = false,
  bgColor = 'bg-transparent',
  bgImage,
  bottomBannerBgImage,
}: RecruitmentLayoutProps) {
  const router = useRouter();
  const {data: recruitmentStatus} = useRecruitmentStatusQuery();
  const isRecruiting = recruitmentStatus?.data?.isActive ?? false;

  return (
    <div
      className={clsx('relative flex w-full min-w-360 justify-center', bgColor)}
      style={{height: `calc(100vh - ${HEADER_HEIGHT}px)`}}>
      {bgImage && (
        <Image
          src={bgImage}
          alt=''
          fill={true}
          aria-hidden={true}
          draggable={false}
          className='object-cover object-center'
        />
      )}

      <div
        className={clsx(
          'relative flex w-360 flex-col items-center justify-center',
          bottomBannerBgImage && 'mb-59.75'
        )}>
        <h1
          className='mb-7.5 bg-clip-text text-center text-h1 text-transparent'
          style={{backgroundImage: 'var(--branding-gradient)'}}>
          COde Together, Arrive TOgether
        </h1>

        <p
          className={`mb-1.25 text-center text-body-l font-semibold text-primary`}>
          {statusText}
        </p>

        <p className='mb-9 text-center text-body-l whitespace-pre-line text-neutral-300'>
          {descriptionText}
        </p>

        {activateNotifyInput && (
          <div className='mb-15.25'>
            <NotifyInput />
          </div>
        )}

        <div className='mb-11.5'>
          <CountdownTimer highlightUnits={isRecruiting} />
        </div>

        {activateApplyButton && (
          <div className='mb-6.75'>
            <Button
              label='지원하러 가기'
              width={240}
              height={48}
              onClick={() => router.push('/apply')}
            />
          </div>
        )}
      </div>

      {/* 하단 배경 이미지 (props로 받은 bottomBannerBgImage 사용) */}
      {bottomBannerBgImage && (
        <div className='absolute bottom-0 h-59.75 w-full'>
          <Image
            src={bottomBannerBgImage}
            alt=''
            aria-hidden={true}
            draggable={false}
            fill
            className='object-cover object-bottom'
          />
        </div>
      )}
    </div>
  );
}
