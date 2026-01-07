'use client';

import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import {useFormContext} from 'react-hook-form';
import {FormDropdown} from '@/components/form/FormDropdown';
import {FormTextarea} from '@/components/form/FormTextarea';
import {FullButton} from '@/components/button/FullButton';
import {mockPlanApplicationForm} from '@/mocks/mock-application-form';
import {PART_TABS} from '@/constants/admin/admin-application-form';
import {PartEtcType} from '@/schemas/admin/admin-application-type';

interface PartQuestionProps {
  onPrev: () => void;
  onNext: () => void;
  onSave: () => void;
}

interface QuestionItem {
  questionId: number;
  sequence: number;
  content: string;
  maxLength: number;
}

export const PartQuestion = ({onPrev, onNext, onSave}: PartQuestionProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    watch,
    formState: {errors},
  } = useFormContext();

  const activePart = (searchParams.get('part') as PartEtcType) || 'plan';

  const handlePartChange = (part: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('part', part);
    router.push(`${pathname}?${params.toString()}`, {scroll: false});
  };

  const activePartLabel = PART_TABS.find(
    (tab) => tab.value === activePart
  )?.label;

  const questions = (mockPlanApplicationForm[
    activePart as keyof typeof mockPlanApplicationForm
  ] || []) as QuestionItem[];

  return (
    <div className='flex w-full flex-col gap-[30px]'>
      <FormDropdown
        label='지원하실 파트를 선택해 주세요.'
        options={PART_TABS}
        value={activePart}
        onChange={handlePartChange}
        className='w-full'
      />

      <div className='flex flex-col gap-7.5'>
        <h3 className='text-h3 text-neutral-600'>
          {activePartLabel} 파트에 관한 질문입니다.
        </h3>

        {questions.map((q) => (
          <FormTextarea
            key={q.questionId}
            label={`${q.sequence}. ${q.content}`}
            maxLength={q.maxLength}
            currentLength={(watch(`ans_${q.questionId}`) || '').length}
            placeholder='내용을 입력해주세요'
            error={errors[`ans_${q.questionId}`]?.message as string}
            {...register(`ans_${q.questionId}`, {
              required: '답변을 작성해주세요',
              maxLength: {value: q.maxLength, message: '글자수를 초과했습니다'},
            })}
          />
        ))}
      </div>

      <div className='flex flex-col gap-[26px]'>
        <div className='flex gap-[26px]'>
          <FullButton
            label='이전'
            variant='primary'
            backgroundColor='neutral-300'
            labelTypo='h4'
            onClick={onPrev}
            type='button'
          />
          <FullButton
            label='다음'
            variant='primary'
            labelTypo='h4'
            type='button'
            onClick={onNext}
          />
        </div>

        <FullButton
          label='저장하기'
          variant='outline'
          textColor='primary'
          type='button'
          labelTypo='h4'
          onClick={onSave}
        />
      </div>
    </div>
  );
};
