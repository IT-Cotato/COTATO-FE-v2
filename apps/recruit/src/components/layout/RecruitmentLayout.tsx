'use client';

import clsx from 'clsx';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {HEADER_HEIGHT} from '@repo/ui/constants/ui';
import {Button} from '@repo/ui/components/buttons/Button';
import {CountdownTimer} from '@/components/layout/CountdownTimer';
import {NotifyInput} from '@/components/layout/NotifyInput';
import {ROUTES} from '@/constants/routes';
import {RECRUITMENT_TEXT} from '@/constants/home/recruitment';

type bgColorKey = 'bg-transparent' | 'bg-neutral-50' | 'bg-[#010101]';

interface RecruitmentLayoutProps {
  isRecruiting: boolean;
  backgroundColor?: bgColorKey;
  backgroundSrc?: string;
  visualStripSrc?: string;
  limitVisualStripWidth?: boolean;
}

export default function RecruitmentLayout({
  isRecruiting,
  backgroundColor,
  backgroundSrc,
  visualStripSrc,
  limitVisualStripWidth = false,
}: RecruitmentLayoutProps) {
  const router = useRouter();

  return (
    <div
      className={clsx(
        'relative flex min-h-fit w-full min-w-360 flex-col items-center justify-center',
        backgroundColor
      )}
      style={{height: `calc(100vh - ${HEADER_HEIGHT}px)`}}>
      {backgroundSrc && (
        <Image
          src={backgroundSrc}
          alt=''
          fill={true}
          sizes='100vw'
          aria-hidden={true}
          draggable={false}
          className='object-contain object-center'
        />
      )}

      <div className='relative flex min-h-fit min-w-360 flex-1 flex-col items-center justify-center'>
        <h1
          className='text-h1 mb-7.5 bg-clip-text text-center text-transparent'
          style={{backgroundImage: 'var(--branding-gradient)'}}>
          COde Together, Arrive TOgether
        </h1>

        <p
          className={`text-body-l text-primary mb-1.25 text-center font-semibold`}>
          {isRecruiting
            ? RECRUITMENT_TEXT.isInProgressRecruiting.statusText
            : RECRUITMENT_TEXT.isDoneRecruiting.statusText}
        </p>

        <p className='text-body-l mb-9 text-center whitespace-pre-line text-neutral-300'>
          {isRecruiting
            ? RECRUITMENT_TEXT.isInProgressRecruiting.descriptionText
            : RECRUITMENT_TEXT.isDoneRecruiting.descriptionText}
        </p>

        {!isRecruiting && (
          <div className='mb-15.25'>
            <NotifyInput />
          </div>
        )}

        <div className='mb-11.5'>
          <CountdownTimer highlightUnits={isRecruiting} />
        </div>

        {isRecruiting && (
          <div className='mb-6.75'>
            <Button
              label='지원하러 가기'
              width={240}
              height={48}
              onClick={() => router.push(ROUTES.APPLY)}
            />
          </div>
        )}
      </div>

      {visualStripSrc && (
        <div className={limitVisualStripWidth ? 'w-360' : 'w-full'}>
          <Image
            src={visualStripSrc}
            alt=''
            aria-hidden={true}
            draggable={false}
            width={7680}
            height={240}
          />
        </div>
      )}
    </div>
  );
}
