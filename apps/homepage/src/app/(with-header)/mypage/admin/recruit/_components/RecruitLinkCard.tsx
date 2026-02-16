'use client';

import {useRecruitmentsStatus} from '@/hooks/queries/useRecruitments.query';
import {ToggleSwitch} from './ToggleSwitch';
import {useToggleRecruitmentsStatusMutation} from '@/hooks/mutations/useRecruitments.mutation';

export const RecruitLinkCard = () => {
  const {data} = useRecruitmentsStatus();
  const {mutate: toggle} = useToggleRecruitmentsStatusMutation();
  return (
    <div
      role='group'
      aria-labelledby='recruit-link-title'
      className='rounded-10px flex flex-col gap-2.5 bg-neutral-50 px-5.5 py-6'>
      <h2 id='recruit-link-title' className='text-h3 text-neutral-800'>
        Recruit 링크 설정
      </h2>
      <p className='text-h5 -mt-2.5 text-neutral-400'>
        홈페이지 헤더의 RECRUIT 메뉴가 연결될 링크를 선택하세요.
      </p>
      <div className='flex items-center justify-between bg-white px-5.5 py-6'>
        <div>
          <h3 className='text-h4 text-neutral-600'>
            외부 링크(cotato.recruit.kr)
          </h3>
          <p className='text-h5 text-neutral-400'>
            현재 홈페이지 외부 recruit 사이트로 연결됩니다
          </p>
        </div>
        <ToggleSwitch
          isChecked={data?.active ?? false}
          onChange={() => toggle()}
        />
      </div>
    </div>
  );
};
