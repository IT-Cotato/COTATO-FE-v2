'use client';

import {ROUTES} from '@/constants/routes';
import {Button} from '@repo/ui/components/buttons/Button';
import {useRouter} from 'next/navigation';

export const DeleteAccountContainer = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-6.5 self-stretch md:flex-row md:items-end md:justify-between'>
      <div className='flex flex-col gap-3.5 md:h-23.5 md:w-179.5'>
        <h3 className='text-h5 md:text-h3 font-bold text-neutral-700'>
          회원 탈퇴
        </h3>
        <span className='md:text-h5 text-body-l text-neutral-600'>
          탈퇴 신청 시 해당 계정은 30일동안 비활성화 상태로 전환됩니다.{' '}
          <br className='hidden md:inline' />
          비활성화 기간 동안 코테이토 홈페이지 사용이 중단됩니다.
        </span>
      </div>
      <Button
        label='탈퇴하기'
        labelTypo='body_l_sb'
        textColor='white'
        className='w-full md:w-33.5'
        width='100%'
        height={42}
        onClick={() => router.push(ROUTES.MYPAGE_ACCOUNT_DELETE)}
      />
    </div>
  );
};
