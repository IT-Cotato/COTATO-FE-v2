import Image from 'next/image';
import CountdownTimer from '@/app/(home)/_components/CountdownTimer';

interface RecruitmentLayoutProps {
  statusText: string;
  descriptionText: string;
  topAction?: React.ReactNode;
  bottomAction?: React.ReactNode;
  isDark?: boolean;
  bgImage: string;
}

export default function RecruitmentLayout({
  statusText,
  descriptionText,
  topAction,
  bottomAction,
  isDark = false,
  bgImage,
}: RecruitmentLayoutProps) {
  return (
    <div
      className={`relative flex h-[calc(100vh-80px)] flex-col items-center ${
        isDark ? 'bg-black text-white' : 'bg-neutral-50 text-black'
      } overflow-hidden`}>
      <div className='z-10 flex w-full flex-col items-center gap-7.5 pt-12 pb-60 lg:pt-[246px] lg:pb-[260px]'>
        {/* 타이틀 영역 */}
        <h1
          className='bg-clip-text text-center text-h1 text-transparent'
          style={{backgroundImage: 'var(--branding-gradient)'}}>
          COde Together, Arrive TOgether
        </h1>

        {/* 상태 설명 텍스트 */}
        <div className='flex flex-col gap-[5px] text-center'>
          <p
            className={`text-body-l font-semibold ${!isDark ? 'text-primary' : 'text-white'}`}>
            {statusText}
          </p>
          <p className='text-center text-body-l whitespace-pre-line'>
            {descriptionText}
          </p>
        </div>

        {topAction && <div className='w-full max-w-[611px]'>{topAction}</div>}

        <CountdownTimer />

        {bottomAction && <div className='self-stretch'>{bottomAction}</div>}
      </div>
      {/* 하단 배경 이미지 (props로 받은 bgImage 사용) */}
      <div className='absolute bottom-0 left-0 h-[239px] w-full'>
        <Image
          src={bgImage}
          alt=''
          fill
          priority
          className='object-cover object-bottom'
        />
      </div>
    </div>
  );
}
