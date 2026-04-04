'use client';

import clsx from 'clsx';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
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
  mobileVisualStripSrc?: string;
}

export default function RecruitmentLayout({
  isRecruiting,
  backgroundColor,
  backgroundSrc,
  visualStripSrc,
  mobileVisualStripSrc,
}: RecruitmentLayoutProps) {
  const router = useRouter();

  return (
    <div
      className={clsx(
        'relative flex min-h-[calc(100dvh-var(--header-height))] w-full flex-col items-center lg:min-h-[calc(100dvh-var(--header-height-lg))]',
        backgroundColor
      )}>
      {backgroundSrc && (
        <Image
          src={backgroundSrc}
          alt=''
          fill={true}
          sizes='100vw'
          aria-hidden={true}
          draggable={false}
          className='object-cover object-center'
        />
      )}

      {(visualStripSrc || mobileVisualStripSrc) && (
        <div className='absolute bottom-0 w-full'>
          {mobileVisualStripSrc && (
            <Image
              src={mobileVisualStripSrc}
              alt=''
              aria-hidden={true}
              draggable={false}
              width={375}
              height={185}
              className='block h-auto w-full md:hidden'
            />
          )}
          {visualStripSrc && (
            <Image
              src={visualStripSrc}
              alt=''
              aria-hidden={true}
              draggable={false}
              width={7680}
              height={240}
              className='hidden h-auto w-full md:block'
            />
          )}
        </div>
      )}

      <div className='relative flex min-h-fit flex-1 flex-col items-center justify-center px-6 pb-[185px] lg:pb-[240px]'>
        <h1
          className='text-h3 md:text-h1 mb-7.5 bg-clip-text text-center font-semibold tracking-tight whitespace-nowrap text-transparent'
          style={{backgroundImage: 'var(--branding-gradient)'}}>
          COde Together, Arrive TOgether
        </h1>

        <p
          className={`text-h5 md:text-body-l text-primary text-center font-bold md:mb-1.25 md:font-semibold`}>
          {isRecruiting
            ? RECRUITMENT_TEXT.isInProgressRecruiting.statusText
            : RECRUITMENT_TEXT.isDoneRecruiting.statusText}
        </p>

        <p className='text-body-l mb-7.5 text-center whitespace-pre-line text-neutral-300 md:mb-9'>
          {isRecruiting
            ? RECRUITMENT_TEXT.isInProgressRecruiting.descriptionText
            : RECRUITMENT_TEXT.isDoneRecruiting.descriptionText}
        </p>

        {!isRecruiting && (
          <div className='mb-7.5 flex w-full justify-center md:mb-15.25'>
            <NotifyInput />
          </div>
        )}

        <div
          className={clsx(
            'flex w-full justify-center',
            isRecruiting ? 'mb-11.5' : 'mb-0'
          )}>
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
    </div>
  );
}
