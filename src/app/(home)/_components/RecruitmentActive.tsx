import Image from 'next/image';
import {Button} from '@/components/button/Button';
import Link from 'next/link';
import {
  RECRUITMENT_NOTICES,
  CURRENT_GENERATION,
} from '@/constants/home/recruitment';

export default function RecruitmentActive() {
  return (
    <section className='relative h-[calc(100dvh-88px)] w-full overflow-hidden bg-black'>
      <Image
        src='/background/background.svg'
        alt='배경 이미지'
        fill
        priority
        className='object-cover object-center'
      />
      <div className='relative z-10 mx-auto flex w-full max-w-[960px] flex-col gap-5 pt-24'>
        <h1 className='text-h4 text-white'>
          🥔 코테이토 {CURRENT_GENERATION}기 지원서 🥔
        </h1>

        <div className='flex flex-col gap-8 rounded-[10px] bg-white px-[82px] pt-[44px] pb-[84px]'>
          <h4 className='text-h4 text-black'>⚠️ 지원 전 유의 사항 ⚠️</h4>

          <ul className='list-disc space-y-3 pl-6 text-neutral-800'>
            {RECRUITMENT_NOTICES.map((notice, index) => (
              <li key={index} className='text-body-l leading-relaxed'>
                {notice}
              </li>
            ))}
          </ul>
        </div>

        <div className='flex justify-end'>
          <Link href='/apply'>
            <Button label='지원하기' />
          </Link>
        </div>
      </div>
    </section>
  );
}
