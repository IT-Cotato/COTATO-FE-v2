export const FaqContact = () => {
  return (
    <div className='flex justify-center'>
      <div className='flex w-fit flex-col gap-3.5'>
        <p className='text-body-l w-fit text-neutral-600'>
          더 자세한 궁금한 내용이 있다면?
        </p>
        <a
          href='https://pf.kakao.com/_LQLyG'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-primary flex items-center justify-center gap-2.5 self-stretch rounded-full p-2.5'>
          <p className='text-body-l-sb text-neutral-800'>
            카카오톡 채널 문의하기
          </p>
        </a>
      </div>
    </div>
  );
};
