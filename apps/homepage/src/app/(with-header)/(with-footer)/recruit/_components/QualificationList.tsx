import {QUALIFICATIONS_CARD_ITEMS} from '@/constants/recruit/recruit';
import {QualificationsCard} from '@/app/(with-header)/(with-footer)/recruit/_components/QualificationsCard';

export const QualificationList = () => {
  return (
    <div className='flex flex-col gap-12.5'>
      <div className='flex flex-col gap-2.5'>
        <p className='text-h4 text-center text-white'>
          막연함이 확신으로 변하는 시간, 혼자가 아닌 &apos;우리&apos;의 코드로
          도달하는 성장의 종착지
        </p>
        <p className='text-h4 text-center text-white'>
          코테이토에서, &apos;말하는 감자&apos;에서 &apos;행동하는 감자&apos;로
          도약할 당신을 기다립니다.
        </p>
      </div>
      <div className='flex justify-center gap-20'>
        {QUALIFICATIONS_CARD_ITEMS.map((item) => (
          <QualificationsCard key={item.qualification} item={item} />
        ))}
      </div>
    </div>
  );
};
