import Background from '@/app/background.svg';
import {Button} from '@/components/button/Button';
import Link from 'next/link';

const NOTICES = [
  '지원 전 모집 일정과 활동 일정을 충분히 확인하신 후 지원해주세요!',
  '파트별 중복 지원은 불가하다는 점 인지 바랍니다.',
  'OT(3월 6일)는 필수 참석 일정입니다. 불참 시 지원이 제한될 수 있습니다. ',
  '제출 후에는 수정이 어려우니 내용을 꼼꼼히 확인한 뒤 제출해주세요.',
  '임시저장 상태는 최종 제출로 인정되지 않습니다. 반드시 제출 버튼을 눌러주세요.',
  '마감 시간 이후에는 제출을 받지 않습니다. 늦지 않게 꼭 제출해주세요!',
  '지원 마감 시간이 임박하면 지원자가 몰려 서버가 불안정할 수 있으므로 가급적 여유롭게 제출하는 것을 권장드립니다.',
];

export default function Home() {
  return (
    <section className='relative h-[calc(100dvh-88px)] w-full overflow-hidden bg-black'>
      <Background
        className='absolute inset-0 h-full w-full'
        preserveAspectRatio='xMidYMid slice'
      />
      <div className='relative z-10 mx-auto flex w-full max-w-[960px] flex-col gap-5 pt-24'>
        <h1 className='text-h4 text-white'>🥔 코테이토 12기 지원서 🥔</h1>

        <div className='flex flex-col gap-8 rounded-[10px] bg-white px-[82px] pt-[44px] pb-[84px]'>
          <h4 className='text-h4 text-black'>⚠️ 지원 전 유의 사항 ⚠️</h4>

          <ul className='list-disc space-y-3 pl-6 text-neutral-800'>
            {NOTICES.map((notice, index) => (
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
