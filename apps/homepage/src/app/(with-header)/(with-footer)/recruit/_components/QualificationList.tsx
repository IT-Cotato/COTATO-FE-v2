import {QUALIFICATIONS_CARD_ITEMS} from '@/constants/recruitment/recruitment-components';
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
          혼자 고민하던 시간은 뒤로하고, 협업의 밀도 속에서 진짜 프로젝트를
          경험하세요.
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
