import {Button} from '@/components/button/Button';

interface MailSendFooterProps {
  waitingCount: number;
  canSendMail: boolean;
  isSent: boolean;
  onSend: () => void;
}

export const MailSendFooter = ({
  waitingCount,
  canSendMail,
  isSent,
  onSend,
}: MailSendFooterProps) => {
  const getButtonColor = () => {
    if (isSent) return 'neutral-500'; // 이미 보냈으면 neutral-500
    return canSendMail ? 'primary' : 'text-disabled'; // 가능하면 primary, 아니면 disabled
  };
  const isDisabled = isSent || !canSendMail;

  return (
    <div className='flex w-full flex-col items-end justify-end'>
      <div className='flex items-center gap-[21px] text-body-l text-neutral-500'>
        <p>(대기자 수 : {waitingCount}명)</p>
        <div className={isDisabled ? 'pointer-events-none' : ''}>
          <Button
            width={156}
            height={36}
            label={isSent ? '메일 전송완료' : '메일 전송하기'}
            borderRadius={5}
            labelTypo='body_l'
            backgroundColor={getButtonColor()}
            disabled={false}
            textColor='neutral-50'
            onClick={onSend}
          />
        </div>
      </div>
    </div>
  );
};
