'use client';
import {Button} from '@/components/button/Button';
import {useState} from 'react';

type NotifyInputProps = {
  className?: string;
};

export default function NotifyInput({className}: NotifyInputProps) {
  const [email, setEmail] = useState('');

  const isValidEmail =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail) {
      console.log('알림 신청:', email);
      // TODO: API 호출
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex max-w-152.75 items-center justify-between gap-3 rounded-[10px] bg-neutral-100 px-3 py-2.75 ${className ?? ''}`}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='메일을 입력해주세요!'
        className='flex-1 bg-transparent text-base outline-none placeholder:text-neutral-800'
      />
      <Button
        type='submit'
        label='알림 신청하기'
        labelTypo='body_m'
        width={126}
        height={34}
        className='px-[19px] py-[5px]'
        backgroundColor='primary'
        disabledBackgroundColor='neutral-500'
        disabled={!isValidEmail}
      />
    </form>
  );
}
