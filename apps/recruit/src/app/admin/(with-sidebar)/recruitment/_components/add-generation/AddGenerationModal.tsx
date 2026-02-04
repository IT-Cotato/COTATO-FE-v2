'use client';

import {useState, FormEvent} from 'react';
import Close from '@/assets/modal/close.svg';
import {useGenerationStore} from '@/store/useGenerationStore';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useAddGenerationMutation} from '@/hooks/mutations/useAdminGeneration.mutation';

interface AddGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddGenerationModal = ({
  isOpen,
  onClose,
}: AddGenerationModalProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const {mutate, isPending} = useAddGenerationMutation();
  const {addGeneration, setSelectedGenerationId} = useGenerationStore();
  const {isRecruiting, setGeneration} = useRecruitmentStore();

  const handleClose = () => {
    setInputValue('');
    onClose();
  };

  if (!isOpen) return null;

  const handleCreate = (e?: FormEvent) => {
    e?.preventDefault();

    const genId = Number(inputValue.trim());
    if (!Number.isInteger(genId) || genId <= 0) {
      alert('올바른 기수 번호를 입력해주세요.');
      return;
    }

    mutate(
      {generationId: genId},
      {
        onSuccess: (response) => {
          if (response.code === 'SUCCESS') {
            addGeneration({generationId: genId});
            setSelectedGenerationId(genId);

            if (!isRecruiting) {
              setGeneration(String(genId));
            }

            setInputValue('');
            onClose();
          }
        },
        onError: (error: unknown) => {
          const isApiError = (err: unknown): err is {message: string} => {
            return (
              typeof err === 'object' &&
              err !== null &&
              'message' in err &&
              typeof (err as {message: string}).message === 'string'
            );
          };

          if (isApiError(error)) {
            alert(error.message);
          } else {
            alert('기수 생성 중 오류가 발생했습니다.');
          }
          console.error('기수 생성 중 에러 발생:', error);
        },
      }
    );
  };

  return (
    <div
      className='z-modal fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm'
      onClick={handleClose}
      role='presentation'>
      <section
        className='relative w-full max-w-[566px] rounded-[20px] bg-white px-[23px] py-5'
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'>
        <div className='flex w-full flex-col items-end gap-2.5'>
          <button
            onClick={handleClose}
            className='absolute top-4 right-5'
            aria-label='닫기'>
            <Close className='h-5.25 w-5.25 cursor-pointer text-neutral-400' />
          </button>
          <form
            onSubmit={handleCreate}
            className='flex flex-col items-center gap-7.5 self-stretch'>
            <h4 id='modal-title' className='text-h4 text-black'>
              기수 추가하기
            </h4>
            <div className='flex w-full items-center gap-[29px]'>
              <label
                htmlFor='generation-input'
                className='text-h5 whitespace-nowrap text-black'>
                기수 이름
              </label>
              <input
                id='generation-input'
                type='text'
                inputMode='numeric' // 모바일에서 숫자 키패드 유도
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='숫자만 입력해주세요.'
                className='focus:border-primary w-full rounded-[10px] border border-neutral-200 bg-neutral-50 px-6 py-3 transition-all outline-none focus:bg-white'
                required
              />
            </div>
            <FullButton
              type='submit'
              label='추가하기'
              labelTypo='h4'
              backgroundColor='neutral-600'
              disabled={isPending}
            />
          </form>
        </div>
      </section>
    </div>
  );
};
