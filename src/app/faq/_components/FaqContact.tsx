const FaqContact = () => {
  return (
    <div className='flex flex-col gap-3.5'>
      <p className='self-stretch text-body-l font-normal text-neutral-600'>
        더 자세한 궁금한 내용이 있다면?
      </p>
      <a
        href='https://open.kakao.com/o/gyQHDG7e'
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center justify-center gap-2.5 self-stretch rounded-[20px] bg-primary p-2.5'>
        <p className='text-body-l text-neutral-800'>카카오톡 채널 문의하기</p>
      </a>
    </div>
  );
};

export default FaqContact;
