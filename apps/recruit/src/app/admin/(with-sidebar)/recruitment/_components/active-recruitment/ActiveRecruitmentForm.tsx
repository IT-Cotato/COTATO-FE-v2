'use client';

import {useState} from 'react';
import {Button} from '@repo/ui/components/buttons/Button';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useGenerationStore} from '@/store/useGenerationStore';
import {GenerationField} from '@/app/admin/(with-sidebar)/recruitment/_components/active-recruitment/GenerationField';
import {RecruitmentConfirmModal} from '@/components/modal/RecruitConfirmModal';
import {useAdminRecruitmentMutation} from '@/hooks/mutations/useAdminRecruitment.mutation';
import {Checkbox} from '@repo/ui/components/checkbox/CheckBox';

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

    activate({
      generationId: Number(generation),
      isAdditionalRecruitmentActive: isAdditional,
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
        className='flex w-full flex-col items-start justify-between gap-2.5 rounded-[10px] border border-neutral-100 bg-white px-8 py-4 lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:border-none lg:bg-neutral-100'>
        <fieldset className='flex w-full items-end justify-between lg:w-auto lg:justify-end lg:gap-11.75'>
          <legend className='sr-only'>모집 설정</legend>
          <GenerationField
            value={generation}
            onChange={setGeneration}
            disabled={isRecruiting}
          />
          <div className='flex shrink-0 items-center gap-2.5 whitespace-nowrap select-none lg:gap-5'>
            <span className='text-body-L text-neutral-600'>추가모집 여부</span>
            <Checkbox
              checked={isAdditional}
              onChange={setIsAdditional}
              disabled={isRecruiting}
              isRecruitment={true}
            />
          </div>
        </fieldset>
        <Button
          type='submit'
          disabled={isLoading}
          label={isRecruiting ? '모집 종료하기' : '모집 시작하기'}
          width='100%'
          wrapperClassName='w-full lg:w-[145px]'
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
