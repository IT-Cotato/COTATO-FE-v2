import {Button} from '@repo/ui/components/buttons/Button';
import {clsx} from 'clsx';
import RefreshIcon from '@/assets/refresh/refresh.svg';

interface MailSendFooterProps {
  waitingCount: number;
  waitingLabel: string;
  canSendMail: boolean;
  isSent: boolean;
  isInProgress: boolean;
  onSend: () => void;
  successCount: number;
  failCount: number;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const MailSendFooter = ({
  waitingCount,
  waitingLabel,
  canSendMail,
  isSent,
  isInProgress,
  onSend,
  successCount,
  failCount,
  isRefreshing,
  onRefresh,
}: MailSendFooterProps) => {
  const shouldShowStatus = true;

  const getButtonColor = () => {
    if (isSent || isInProgress) return 'text-disabled';
    return canSendMail ? 'primary' : 'text-disabled';
  };

  return (
    <div className='mt-1 flex w-full flex-col items-end gap-3 lg:mt-0'>
      <div className='text-body-l mb-2.5 flex w-full flex-col items-end gap-3.5 text-neutral-500 lg:mb-0 lg:w-auto lg:flex-row lg:items-center lg:gap-2.5'>
        <div className='flex items-center gap-2.5'>
          <p>
            ({waitingLabel} 수: {waitingCount}명)
          </p>
          {shouldShowStatus && (
            <div className='flex items-center gap-2 rounded-[5px] border border-neutral-200 bg-neutral-50 px-5.75 py-1.75 lg:gap-4 lg:rounded-lg lg:px-4 lg:py-2'>
              <div className='text-body-m flex gap-2 font-bold lg:gap-3'>
                <span className='text-primary'>성공: {successCount}</span>
                <span className='text-alert'>실패: {failCount}</span>
              </div>
              {isInProgress && (
                <button
                  type='button'
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className={clsx(
                    'flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-800',
                    {'animate-spin': isRefreshing}
                  )}>
                  <RefreshIcon className='h-4 w-4 text-neutral-600' />
                </button>
              )}
            </div>
          )}
        </div>
        <div
          className={clsx('w-full lg:w-auto', {
            'pointer-events-none': isSent || isInProgress || !canSendMail,
          })}>
          <Button
            width='100%'
            wrapperClassName='w-full lg:w-[145px]'
            height={36}
            label={
              isInProgress
                ? '전송 중'
                : isSent
                  ? '메일 전송완료'
                  : '메일 전송하기'
            }
            borderRadius={5}
            labelTypo='body_l'
            fontWeight={600}
            backgroundColor={getButtonColor()}
            textColor='neutral-50'
            onClick={onSend}
          />
        </div>
      </div>
    </div>
  );
};
