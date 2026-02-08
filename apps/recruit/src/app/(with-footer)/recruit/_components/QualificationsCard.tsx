import {QualificationsCardItem} from '@/types/recruit-components.type';
import Image from 'next/image';

interface QualificationsCardProps {
  item: QualificationsCardItem;
}

export const QualificationsCard = ({item}: QualificationsCardProps) => {
  return (
    <div className='flex h-73 w-74.5 shrink-0 flex-col items-center justify-center gap-2.5 rounded-[10px] bg-neutral-50/80 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.00)_55.77%,rgba(255,255,255,0.50)_100%)] shadow-[0_6px_15px_0_rgba(0,0,0,0.10)] select-none'>
      <Image
        src={item.illustrationSrc}
        alt='QualificationsCard'
        draggable={false}
      />
      <p className='text-h5 text-center wrap-anywhere whitespace-pre-line text-neutral-800'>
        {item.description}
      </p>
    </div>
  );
};
