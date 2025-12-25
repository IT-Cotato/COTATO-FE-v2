'use client';

import {useState} from 'react';
import {Button} from '@/components/button/Button';
import {GenerationField} from './GenerationField';
import {PeriodField} from './PeriodField';
import {RecruitmentModal} from '../RecruitmentModal';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';

export const ActiveRecruitmentForm = () => {
  const {isRecruiting, setIsRecruiting, generation, setGeneration} =
    useRecruitmentStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  {
    /* 추후 api에 맞춰 수정 예정입니다. 임의로 로그를 찍어둠 */
  }
  const handleConfirm = () => {
    if (!generation) {
      alert('기수를 입력해주세요.');
      return;
    }

    setIsRecruiting(!isRecruiting);
    setIsModalOpen(false);

    console.log(`${generation}기 모집 ${isRecruiting ? '종료' : '시작'}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generation) return console.log('실패. 기수를 입력해주세요.');
    setIsModalOpen(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex h-25 items-end justify-between rounded-[10px] bg-neutral-100 pt-3 pr-5 pb-3 pl-3.5'>
        <fieldset className='flex h-19 gap-19 pb-1 text-body-m font-semibold'>
          <legend className='sr-only'>모집 설정</legend>
          <GenerationField value={generation} onChange={setGeneration} />
          <PeriodField
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </fieldset>
        <Button
          type='submit'
          label={isRecruiting ? '모집 종료하기' : '모집 시작하기'}
          width={156}
          height={36}
          labelTypo='body_l'
          backgroundColor={isRecruiting ? 'alert' : 'primary'}
        />
      </form>
      <RecruitmentModal
        isOpen={isModalOpen}
        content={
          isRecruiting
            ? '모집을 종료하시겠습니까?'
            : `${generation}기 모집을 시작하시겠습니까?`
        }
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};
