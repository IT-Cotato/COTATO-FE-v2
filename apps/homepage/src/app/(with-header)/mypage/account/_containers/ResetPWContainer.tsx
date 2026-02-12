import {ResetPWHeader} from '@/app/(with-header)/mypage/account/_components/ResetPWHeader';
import {ResetPWForm} from '@/app/(with-header)/mypage/account/_components/ResetPWForm';

export const ResetPWContainer = () => {
  return (
    <div className='flex flex-col gap-[38px]'>
      <ResetPWHeader />
      <ResetPWForm />
    </div>
  );
};
