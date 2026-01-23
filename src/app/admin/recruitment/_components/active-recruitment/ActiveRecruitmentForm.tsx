'use client';

import {useState} from 'react';
import {Button} from '@/components/button/Button';
import {PeriodField} from '@/app/admin/recruitment/_components/active-recruitment/PeriodField';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useGenerationStore} from '@/store/useGenerationStore';
import {GenerationField} from '@/app/admin/recruitment/_components/active-recruitment/GenerationField';
import {RecruitmentConfirmModal} from '@/components/modal/RecruitConfirmModal';
import {formatDate} from '@/utils/formatDate';
import {useAdminRecruitmentMutation} from '@/hooks/mutations/useAdminRecruitment.mutation';
import {Checkbox} from '@/components/checkbox/CheckBox';

export const ActiveRecruitmentForm = () => {
  const {
    isRecruiting,
    generation,
    setGeneration,
    isAdditional,
    setIsAdditional,
  } = useRecruitmentStore();

  const {generations} = useGenerationStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const {activate, deactivate, isLoading} = useAdminRecruitmentMutation();

  const handleConfirm = () => {
    if (!generation) {
      alert('기수를 입력해주세요.');
      return;
    }

    const isExist = generations.some(
      (g) => g.generationId === Number(generation)
    );

    if (!isRecruiting && !isExist) {
      alert(
        `${generation}기는 아직 생성되지 않았습니다.\n기수 추가하기를 통해 먼저 기수를 생성해주세요.`
      );
      setIsModalOpen(false);
      return;
    }

    if (isRecruiting) {
      deactivate({generationId: Number(generation)});
      setIsModalOpen(false);
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

    activate({
      generationId: Number(generation),
      isAdditionalRecruitmentActive: isAdditional,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generation) {
      alert('기수를 입력해주세요.');
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex items-end justify-between rounded-[10px] bg-neutral-100 px-8 py-4'>
        <fieldset className='flex items-end justify-end gap-11.75'>
          <legend className='sr-only'>모집 설정</legend>
          <GenerationField
            value={generation}
            onChange={setGeneration}
            disabled={isRecruiting}
          />
          <PeriodField
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            disabled={isRecruiting}
          />
          <div className='flex shrink-0 items-center gap-5 whitespace-nowrap select-none'>
            <span className='text-body-L text-neutral-600'>추가모집 여부</span>
            <Checkbox
              checked={isAdditional}
              onChange={setIsAdditional}
              disabled={isRecruiting}
            />
          </div>
        </fieldset>
        <Button
          type='submit'
          disabled={isLoading}
          label={isRecruiting ? '모집 종료하기' : '모집 시작하기'}
          width={145}
          height={36}
          borderRadius={5}
          labelTypo='body_l'
          backgroundColor={isRecruiting ? 'alert' : 'primary'}
        />
      </form>
      <RecruitmentConfirmModal
        isOpen={isModalOpen}
        isRecruiting={isRecruiting}
        isAdditional={isAdditional}
        generation={generation}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};
