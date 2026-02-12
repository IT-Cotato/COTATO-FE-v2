'use client';

import {ROUTES} from '@/constants/routes';
import {Button} from '@repo/ui/components/buttons/Button';
import {useRouter} from 'next/navigation';

export const DeleteAccountContainer = () => {
  const router = useRouter();
  return (
    <div className='flex items-end justify-between self-stretch'>
      <div className='flex h-[94px] w-[718px] flex-col gap-1'>
        <h3 className='text-h3 text-neutral-700'>회원 탈퇴</h3>
        <span className='text-h5 text-neutral-600'>
          탈퇴 신청 시 해당 계정은 30일동안 비활성화 상태로 전환됩니다.
          <br />
          비활성화 기간 동안 코테이토 홈페이지 사용이 중단됩니다.
        </span>
      </div>
      <Button
        label='탈퇴하기'
        labelTypo='body_l_sb'
        textColor='white'
        width={134}
        height={42}
        onClick={() => router.push(ROUTES.MYPAGE_ACCOUNT_DELETE)}
      />
    </div>
  );
};
