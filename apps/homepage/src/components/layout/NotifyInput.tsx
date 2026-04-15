'use client';

import {useState} from 'react';
// import {Button} from '@repo/ui/components/buttons/Button';
import {RecruitmentNotificationModal} from '@/components/modal/RecruitmentNotificationModal';
import {useSubscribeRecruitmentNotify} from '@/hooks/mutations/useRecruit.mutation';
import clsx from 'clsx';

export const NotifyInput = () => {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {mutate, isPending} = useSubscribeRecruitmentNotify();

  const isValidEmail =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail && !isPending) {
      mutate(email, {
        onSuccess: () => {
          setIsModalOpen(true);
        },
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmNotification = () => {
    closeModal();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex w-full gap-3 overflow-hidden rounded-[10px] bg-neutral-100 px-3 py-2.75'>
        <input
          type='email'
          value={email}
          disabled={isPending}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='메일을 입력해주세요!'
          className='text-body-m min-w-0 flex-1 text-neutral-800 outline-none placeholder:text-neutral-400'
        />
        <button
          type='submit'
          className={clsx(
            'text-body-m w-fit rounded-[10px] px-4 py-1 text-center text-white',
            isValidEmail ? 'bg-primary' : 'bg-neutral-500'
          )}
          disabled={!isValidEmail || isPending}>
          알림 신청하기
        </button>
        {/* <Button
          type='submit'
          label='알림 신청하기'
          labelTypo='body_m'
          width={126}
          height={34}
          className='py-1.25'
          backgroundColor='primary'
          disabledBackgroundColor='neutral-500'
          disabled={!isValidEmail || isPending}
        /> */}
      </form>
      <RecruitmentNotificationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmNotification}
      />
    </>
  );
};
