import {Button} from '@/components/button/Button';

interface MailSendFooterProps {
  waitingCount: number;
  canSendMail: boolean;
  onSend: () => void;
}

export const MailSendFooter = ({
  waitingCount,
  canSendMail,
  onSend,
}: MailSendFooterProps) => {
  return (
    <div className='flex w-full flex-col items-end justify-end'>
      <div className='flex items-center gap-[21px] text-body-l text-neutral-500'>
        <p>(대기자 수 : {waitingCount}명)</p>
        <Button
          width={156}
          height={36}
          label='메일 전송하기'
          borderRadius={5}
          labelTypo='body_l'
          backgroundColor={canSendMail ? 'primary' : 'text-disabled'}
          disabled={!canSendMail}
          textColor='neutral-50'
          onClick={onSend}
        />
      </div>
    </div>
  );
};
