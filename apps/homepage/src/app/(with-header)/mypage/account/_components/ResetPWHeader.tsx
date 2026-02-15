export const ResetPWHeader = () => {
  return (
    <div className='flex flex-col items-start gap-4.5 self-stretch'>
      <h2 className='text-h2 text-neutral-800'>계정 관리</h2>
      <div className='flex w-115.5 flex-col items-start gap-1'>
        <h3 className='text-h3 text-neutral-700'>비밀번호 재설정</h3>
        <span className='text-h5 text-neutral-600'>
          비밀번호를 변경하면 모든 장치에서 로그아웃이 진행됩니다.
        </span>
      </div>
    </div>
  );
};
