import {Button} from '@/components/button/Button';
import {MailJobStatus} from '@/schemas/admin/admin-mail.type';
import {clsx} from 'clsx';

interface MailSendFooterProps {
  waitingCount: number;
  waitingLabel: string;
  canSendMail: boolean;
  isSent: boolean;
  onSend: () => void;
  jobStatus: MailJobStatus | null;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const MailSendFooter = ({
  waitingCount,
  waitingLabel,
  canSendMail,
  isSent,
  onSend,
  jobStatus,
  isRefreshing,
  onRefresh,
}: MailSendFooterProps) => {
  const isInProgress = jobStatus !== null && !jobStatus.isCompleted;
  const shouldShowStatus = jobStatus !== null || isSent;

  const getButtonColor = () => {
    if (isSent || isInProgress) return 'neutral-500';
    return canSendMail ? 'primary' : 'text-disabled';
  };

  return (
    <div className='flex w-full flex-col items-end gap-3'>
      <div className='flex items-center gap-[21px] text-body-l text-neutral-500'>
        <p>
          ({waitingLabel} 수: {waitingCount}명)
        </p>
        {shouldShowStatus && (
          <div className='flex items-center gap-4 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2'>
            <div className='flex gap-3 text-body-m font-bold'>
              <span className='text-primary'>
                성공: {jobStatus?.successCount ?? 0}
              </span>
              <span className='text-alert'>
                실패: {jobStatus?.failCount ?? 0}
              </span>
            </div>
            {isInProgress && (
              <button
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
            disabled={!canSendMail && !isSent && !isInProgress}
            textColor='neutral-50'
            onClick={onSend}
          />
        </div>
      </div>
    </div>
  );
};
