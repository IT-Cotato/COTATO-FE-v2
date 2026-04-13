import {QUALIFICATIONS_CARD_ITEMS} from '@/constants/recruit/recruit';
import {QualificationsCard} from '@/app/(with-header)/(with-footer)/recruit/_mobile/_components/QualificationsCard';

export const QualificationList = () => {
  return (
    <div className='flex h-dvh w-full flex-col items-center justify-center gap-12.5 overflow-hidden px-5'>
      <div className='flex w-full flex-col gap-2.5 px-5'>
        <p className='text-h5 w-full text-center text-neutral-600'>
          막연함이 확신으로 변하는 시간,
          <br />
          함께 도달하는 성장의 종착지
        </p>
        <p className='text-h5 w-full text-center text-neutral-600'>
          코테이토에서, &apos;말하는 감자&apos;에서 &apos;행동하는 감자&apos;로
          도약할 당신을 기다립니다.
        </p>
      </div>

      <div className='mx-auto flex flex-col gap-3'>
        {QUALIFICATIONS_CARD_ITEMS.map((item) => (
          <QualificationsCard key={item.qualification} item={item} />
        ))}
      </div>
    </div>
  );
};
