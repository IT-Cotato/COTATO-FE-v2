import {QUALIFICATIONS_CARD_ITEMS} from '@/constants/recruit/recruit-components';
import {QualificationsCard} from '@/app/recruit/_desktop/_components/QualificationsCard';

export const QualificationList = () => {
  return (
    <div className='flex w-full flex-col items-center gap-12.5'>
      <div className='flex w-full flex-col gap-2.5'>
        <p className='text-h4 w-full text-center text-neutral-600'>
          막연함이 확신으로 변하는 시간, 혼자가 아닌 &apos;우리&apos;의 코드로
          도달하는 성장의 종착지
        </p>
        <p className='text-h4 w-full text-center text-neutral-600'>
          코테이토에서, &apos;말하는 감자&apos;에서 &apos;행동하는 감자&apos;로
          도약할 당신을 기다립니다.
        </p>
      </div>

      <div className='flex w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
        <div className='mx-auto flex gap-20'>
          {QUALIFICATIONS_CARD_ITEMS.map((item) => (
            <QualificationsCard key={item.qualification} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
