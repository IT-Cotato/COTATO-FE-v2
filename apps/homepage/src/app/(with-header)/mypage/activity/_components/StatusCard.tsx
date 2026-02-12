import {
  StatusCardItem,
  PenaltyCardItem,
} from '@/schemas/mypage-mem/mypage-mem-type';
import GreenIcon from '@/assets/mypage-mem/activity/green.svg';
import BrownIcon from '@/assets/mypage-mem/activity/brown.svg';
import GrayIcon from '@/assets/mypage-mem/activity/gray.svg';
import RedIcon from '@/assets/mypage-mem/activity/red.svg';
import TotalIcon from '@/assets/mypage-mem/activity/total.svg';
import BonusIcon from '@/assets/mypage-mem/activity/bonus.svg';
import MinusIcon from '@/assets/mypage-mem/activity/minus.svg';
import BeerIcon from '@/assets/mypage-mem/activity/beer-networking.svg';

type CombinedCardProps = StatusCardItem | PenaltyCardItem;

export const StatusCard = (props: CombinedCardProps) => {
  const {label, value, variant} = props;

  const IconMap = {
    // 출석
    attend: GreenIcon,
    late: BrownIcon,
    'unauthorized-absent': GrayIcon,
    absent: RedIcon,

    // 벌점
    total: TotalIcon,
    bonus: BonusIcon,
    minus: MinusIcon,
    'beer-networking': BeerIcon,
  };

  const SelectedIcon = IconMap[variant as keyof typeof IconMap];

  return (
    <div className='text-h4 shadow-mem-card flex h-62.5 flex-1 flex-col items-center gap-2.5 rounded-[10px] px-3.25 py-5 text-neutral-800'>
      <SelectedIcon />
      <span>{label}</span>
      <div className='h-12.5 w-full rounded-[10px] bg-neutral-50 py-2.25 text-center'>
        {value}
      </div>
    </div>
  );
};
