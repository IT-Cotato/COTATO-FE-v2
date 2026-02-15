'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@repo/ui/components/buttons/Button';
import {Modal} from '@repo/ui/components/modal/Modal';
import BackIcon from '@/assets/chevrons/chevron-left-strict.svg';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {useLogoutMutation} from '@/hooks/mutations/auth/useAuth.mutations';
import {DeleteCheckbox} from '@/app/(with-header)/mypage/account/delete/_components/DeleteCheckbox';

export const DeleteAccount = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {mutate: logout} = useLogoutMutation();

  const handleDeleteConfirm = () => {
    setIsModalOpen(false);
    logout();
  };

  return (
    <div className='mt-3.5 flex flex-col gap-7.5'>
      <div className='flex flex-col gap-9.75'>
        <div className='flex items-center gap-5'>
          <BackIcon
            className='h-7 w-7 cursor-pointer text-neutral-700'
            onClick={() => router.back()}
          />
          <h3 className='text-h3 text-neutral-700'>회원 탈퇴</h3>
        </div>
        <div className='flex flex-col gap-11.25 rounded-[10px] border-2 border-neutral-200 px-10 py-8.25'>
          <div className='flex flex-col gap-5.25'>
            <h4 className='text-h4 text-neutral-700'>탈퇴 안내</h4>
            <div className='text-h5 flex flex-col gap-7 leading-relaxed text-neutral-600'>
              <p>
                회원님께서 COTATO 동아리 페이지의 회원 탈퇴를 진행하실 경우,
                아래 사항에 따라 계정이 비활성화되며 30일 후에는 모든 정보가
                영구적으로 삭제됩니다. <br />
                탈퇴를 신청하기 전에 안내 사항을 꼭 확인해 주세요.
              </p>
              <div className='text-body-l flex flex-col gap-7 text-neutral-700'>
                <div className='flex flex-col gap-1'>
                  <p>1. 계정 비활성화</p>
                  <p className='pl-5'>
                    탈퇴 신청을 하시면 해당 계정은 30일 동안 비활성화 상태로
                    전환됩니다. 비활성화 기간 동안 COTATO 서비스 이용이
                    제한됩니다.
                  </p>
                </div>
                <div className='text-body-l flex flex-col gap-7 text-neutral-700'>
                  <div className='flex flex-col gap-1'>
                    <p>2. 데이터 수정 및 보존</p>
                    <ul className='flex flex-col gap-1 pl-4'>
                      <li className='relative pl-3 before:absolute before:left-0 before:text-neutral-400 before:content-["•"]'>
                        이름: 일부가 마스킹 처리되어 보관 (예: 홍길동 → 홍*동)
                      </li>
                      <li className='relative pl-3 before:absolute before:left-0 before:text-neutral-400 before:content-["•"]'>
                        이메일, 비밀번호, 전화번호: 삭제
                      </li>
                      <li className='relative pl-3 before:absolute before:left-0 before:text-neutral-400 before:content-["•"]'>
                        활동 내역 및 개인 정보 등은 명시된 기간 후 영구
                        삭제됩니다.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='text-body-l flex flex-col gap-7 text-neutral-700'>
                  <div className='flex flex-col gap-1'>
                    <p>3. 계정 복구 가능 기간</p>
                    <p className='pl-4'>
                      비활성화 기간(30일 이내)에 다시 로그인하면 계정이
                      활성화되어 서비스를 계속 이용하실 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className='text-body-l text-neutral-800'>
                탈퇴와 관련해 추가적인 문의 사항이 있으시면 COTATO 관리자에게
                연락해 주시기 바랍니다.
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2.5'>
            <DeleteCheckbox checked={isChecked} onChange={setIsChecked} />
            <span className='text-h5 text-neutral-600'>
              안내사항을 모두 확인하였으며, 이에 동의합니다.
            </span>
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          label='탈퇴하기'
          width={227}
          height={56}
          labelTypo='body_l_sb'
          borderRadius={15}
          disabled={!isChecked}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='회원 탈퇴가 완료되었습니다.'
        titleStyle='text-h4 text-neutral-800'
        content={
          <p>
            그동안 코테이토를 이용해 주셔서
            <br />
            진심으로 감사합니다.
          </p>
        }
        actions={
          <FullButton
            type='button'
            label='확인'
            width={340}
            height={47}
            onClick={handleDeleteConfirm}
          />
        }
      />
    </div>
  );
};
