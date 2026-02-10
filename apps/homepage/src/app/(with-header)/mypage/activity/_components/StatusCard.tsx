import {StatusCardItem} from '@/schemas/mypage-mem/mypage-mem-type';
import OrangeIcon from '@/assets/mypage-mem/activity/orange.svg';
import BrownIcon from '@/assets/mypage-mem/activity/brown.svg';
import GrayIcon from '@/assets/mypage-mem/activity/gray.svg';
import RedIcon from '@/assets/mypage-mem/activity/red.svg';

export const StatusCard = ({label, value, color}: StatusCardItem) => {
  const IconMap = {
    orange: OrangeIcon,
    brown: BrownIcon,
    gray: GrayIcon,
    red: RedIcon,
  };

  const SelectedIcon = IconMap[color];

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
