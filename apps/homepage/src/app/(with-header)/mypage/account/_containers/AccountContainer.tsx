import {DeleteAccountContainer} from '@/app/(with-header)/mypage/account/_containers/DeleteAccountContainer';
import {ResetPWContainer} from '@/app/(with-header)/mypage/account/_containers/ResetPWContainer';

export const AccountContainer = () => {
  return (
    <div className='flex flex-col gap-[50px]'>
      <ResetPWContainer />
      <DeleteAccountContainer />
    </div>
  );
};
