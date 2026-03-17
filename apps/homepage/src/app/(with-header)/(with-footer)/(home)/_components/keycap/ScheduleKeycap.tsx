import Image from 'next/image';

interface ScheduleKeycapProps {
  /** 호버 시 보여줄 이미지 경로 */
  imageSrc: string;
  /** 이미지 위에 띄울 제목 (예: OT, MT) */
  title: string;
  /** 이미지 위에 띄울 부제목/날짜 (선택 사항) */
  subTitle?: string;
  /** 추가적인 클래스 (그리드 레이아웃용 등) */
  className?: string;
  /** 제목의 기본 색상 클래스 **/
  titleColor?: string;
}

export const ScheduleKeycap = ({
  imageSrc,
  title,
  subTitle,
  className = '',
  titleColor = 'text-neutral-500',
}: ScheduleKeycapProps) => {
  return (
    <div
      className={`group shadow-home-keycap relative inline-block h-39 w-39 overflow-hidden rounded-[27px] xl:h-67 xl:w-67 xl:rounded-[50px] ${className}`}
      role='button'
      tabIndex={0}>
      <Image
        src='/keycap/white-keycap.svg'
        alt=''
        fill
        className='transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0 group-focus-visible:opacity-0'
        unoptimized={true}
      />
      <div className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 group-focus-visible:opacity-100'>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className='object-cover'
          unoptimized={true}
        />
        <div className='absolute inset-0 bg-black/20' />
      </div>
      <span
        className={`text-h4 xl:text-h2 absolute top-7.75 left-8.75 z-10 transition-colors group-hover:text-white xl:top-16.5 xl:left-16.5 ${titleColor} group-focus:text-white group-focus-visible:text-white`}>
        {title}
      </span>
      {subTitle && (
        <span className='text-h5 xl:text-h4 absolute bottom-[27.5px] left-8.75 z-10 text-neutral-100 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100 group-focus-visible:opacity-100 xl:top-30.5 xl:left-16.5'>
          {subTitle}
        </span>
      )}
    </div>
  );
};
