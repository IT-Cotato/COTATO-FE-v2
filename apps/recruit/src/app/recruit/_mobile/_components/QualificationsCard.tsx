import {QualificationsCardItem} from '@/types/recruit-components.type';
import Image from 'next/image';

interface QualificationsCardProps {
  item: QualificationsCardItem;
}

export const QualificationsCard = ({item}: QualificationsCardProps) => {
  return (
    <div className='flex w-69.75 shrink-0 items-center gap-5.25 rounded-[10px] bg-neutral-50/80 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.00)_55.77%,rgba(255,255,255,0.50)_100%)] px-4.25 py-1.5 shadow-[0_6px_15px_0_rgba(0,0,0,0.10)] select-none'>
      <Image
        src={item.illustrationSrc}
        alt=''
        aria-hidden={true}
        draggable={false}
        width={60}
        height={60}
      />
      <p className='text-body-l wrap-anywhere whitespace-pre-line text-neutral-800'>
        {item.description}
      </p>
    </div>
  );
};
