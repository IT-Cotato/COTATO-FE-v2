import {Button} from '@/components/button/Button';
import {clsx} from 'clsx';

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
    <div className='flex w-full flex-col items-end gap-3'>
      <div className='flex items-center gap-2.5 text-body-l text-neutral-500'>
        <p>
          ({waitingLabel} 수: {waitingCount}명)
        </p>
        {shouldShowStatus && (
          <div className='flex items-center gap-4 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2'>
            <div className='flex gap-3 text-body-m font-bold'>
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
                <span className='text-[18px]'>↻</span>
              </button>
            )}
          </div>
        )}
        <div
          className={clsx({
            'pointer-events-none': isSent || isInProgress || !canSendMail,
          })}>
          <Button
            width={145}
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
            backgroundColor={getButtonColor()}
            textColor='neutral-50'
            onClick={onSend}
          />
        </div>
      </div>
    </div>
  );
};
