import type {ReactNode} from 'react';

/** 공개 홈페이지와 사진 미리보기가 동일한 콘텐츠 너비·여백을 사용한다. */
export const HomeContentLayout = ({children}: {children: ReactNode}) => (
  <div className='flex flex-col items-center gap-70 overflow-x-hidden bg-white px-6 pb-70 lg:gap-100 lg:pb-100'>
    {children}
  </div>
);
