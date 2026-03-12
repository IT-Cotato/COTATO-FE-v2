import GreenIcon from '@/assets/mypage-mem/activity/green.svg';
import BrownIcon from '@/assets/mypage-mem/activity/brown.svg';
import GrayIcon from '@/assets/mypage-mem/activity/gray.svg';
import RedIcon from '@/assets/mypage-mem/activity/red.svg';
import TotalIcon from '@/assets/mypage-mem/activity/total.svg';
import BonusIcon from '@/assets/mypage-mem/activity/bonus.svg';
import MinusIcon from '@/assets/mypage-mem/activity/minus.svg';
import BeerIcon from '@/assets/mypage-mem/activity/beer-networking.svg';
import {
  StatusCardProps,
  CardVariant,
} from '@/schemas/mypage-mem/activity/mypage-mem-type';
import {FC, SVGProps} from 'react';

export const StatusCard = ({label, value, variant}: StatusCardProps) => {
  const IconMap: Record<CardVariant, FC<SVGProps<SVGSVGElement>>> = {
    attend: GreenIcon,
    late: BrownIcon,
    absent: RedIcon,
    'unauthorized-absent': GrayIcon,
    total: TotalIcon,
    bonus: BonusIcon,
    minus: MinusIcon,
    'beer-networking': BeerIcon,
  };

  const SelectedIcon = IconMap[variant];

  return (
    <div className='text-body-l-b md:text-h4 shadow-mem-card flex h-33 flex-1 flex-col items-center gap-3.25 rounded-[10px] bg-white px-3.25 py-2.75 text-neutral-800 md:h-62.5 md:gap-2.5 md:py-5'>
      <div className='flex h-8 w-7.5 items-center justify-center md:h-27 md:w-25'>
        <SelectedIcon />
      </div>
      <span className='whitespace-nowrap'>{label}</span>
      <div className='text-h5 md:text-h4 h-7.5 w-full rounded-[10px] bg-neutral-50 text-center font-bold md:h-12.5 md:py-2.25'>
        {value ?? 0}
      </div>
    </div>
  );
};
