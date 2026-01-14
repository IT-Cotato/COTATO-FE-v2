'use client';

import {useState} from 'react';
import {Button} from '@/components/button/Button';
import {PeriodField} from '@/app/admin/(with-sidebar)/recruitment/_components/active-recruitment/PeriodField';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {GenerationField} from '@/app/admin/(with-sidebar)/recruitment/_components/active-recruitment/GenerationField';
import {RecruitmentConfirmModal} from '@/components/modal/RecruitConfirmModal';
import {formatDate} from '@/utils/formatDate';
import {useAdminRecruitmentMutation} from '@/hooks/mutations/useAdminRecruitmentMutation';

export const ActiveRecruitmentForm = () => {
  const {isRecruiting, setIsRecruiting, generation, setGeneration} =
    useRecruitmentStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const {activate, deactivate, isLoading} = useAdminRecruitmentMutation();

  const handleConfirm = () => {
    if (!generation) {
      alert('기수를 입력해주세요.');
      return;
    }

    if (!startDate || !endDate) {
      alert('모집 기간을 선택해주세요.');
      return;
    }
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    if (!formattedStartDate || !formattedEndDate) {
      alert('날짜 형식이 올바르지 않습니다.');
      return;
    }

    if (isRecruiting) {
      deactivate({generationId: Number(generation)});
    } else {
      activate({
        generationId: Number(generation),
        isAdditionalRecruitmentActive: false,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    }

    setIsModalOpen(false);
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
          disabled={isLoading}
          label={isRecruiting ? '모집 종료하기' : '모집 시작하기'}
          width={156}
          height={36}
          labelTypo='body_l'
          backgroundColor={isRecruiting ? 'alert' : 'primary'}
        />
      </form>
      <RecruitmentConfirmModal
        isOpen={isModalOpen}
        isRecruiting={isRecruiting}
        generation={generation}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};
