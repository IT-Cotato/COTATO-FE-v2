export const ResetPWHeader = () => {
  return (
    <div className='flex flex-col items-start gap-4.5 self-stretch'>
      <h2 className='text-h2 hidden text-neutral-800 lg:block'>계정 관리</h2>
      <div className='flex flex-col items-start gap-1.25 lg:w-115.5 lg:gap-1'>
        <h3 className='text-h5 lg:text-h3 font-bold text-neutral-700'>
          비밀번호 재설정
        </h3>
        <span className='text-body-l lg:text-h5 text-neutral-600'>
          비밀번호를 변경하면 모든 장치에서 로그아웃이 진행됩니다.
        </span>
      </div>
    </div>
  );
};
