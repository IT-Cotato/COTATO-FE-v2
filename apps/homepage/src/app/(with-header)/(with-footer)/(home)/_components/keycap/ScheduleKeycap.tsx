import Image from 'next/image';
import WhiteKeycap from '@/assets/home/keycap/white-keycap.svg';

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
      className={`group relative inline-block h-72.25 w-72.25 cursor-pointer overflow-hidden rounded-[50px] ${className}`}>
      <WhiteKeycap className='transition-opacity duration-300 group-hover:opacity-0' />
      <div className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <Image src={imageSrc} alt={title} fill className='object-cover' />
        <div className='absolute inset-0 bg-black/20' />
      </div>
      <span
        className={`text-h2 absolute top-16.5 left-16.5 z-10 font-bold transition-colors group-hover:text-white ${titleColor}`}>
        {title}
      </span>
      {subTitle && (
        <span className='text-h4 absolute top-30.5 left-16.5 z-10 font-medium text-neutral-100 opacity-0 transition-opacity group-hover:opacity-100'>
          {subTitle}
        </span>
      )}
    </div>
  );
};
