'use client';

import {useState} from 'react';
import {Button} from '@repo/ui/components/buttons/Button';
import {RecruitmentNotificationModal} from '@/components/modal/RecruitmentNotificationModal';
// import {useSubscribeRecruitmentNotify} from '@/hooks/mutations/useRecruitment.mutation';

export const NotifyInput = () => {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const {mutate} = useSubscribeRecruitmentNotify();

  const isValidEmail =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail) {
      // mutate({email});
      setIsModalOpen(true);
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
        className='flex w-152.75 gap-3 rounded-[10px] bg-neutral-100 px-3 py-2.75'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='메일을 입력해주세요!'
          className='text-body-m flex-1 text-neutral-800 outline-none placeholder:text-neutral-400'
        />
        <Button
          type='submit'
          label='알림 신청하기'
          labelTypo='body_m'
          width={126}
          height={34}
          className='px-4.75 py-1.25'
          backgroundColor='primary'
          disabledBackgroundColor='neutral-500'
          disabled={!isValidEmail}
        />
      </form>
      <RecruitmentNotificationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmNotification}
      />
    </>
  );
};
