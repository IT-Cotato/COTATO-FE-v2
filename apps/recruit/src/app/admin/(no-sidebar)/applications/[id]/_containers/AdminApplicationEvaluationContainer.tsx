'use client';

import {EVALUATOR_TABS} from '@/constants/admin/admin-applications';
import {useAdminApplicationEvaluation} from '@/hooks/queries/useAdminApplication.query';
import {EvaluatorType} from '@/schemas/admin/admin-application.schema';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {useDebounce} from '@/hooks/useDebounce';
import {usePostAdminApplicationEvaluation} from '@/hooks/mutations/useAdminApplication.mutation';

const DEFAULT_EVALUATOR: EvaluatorType = 'STAFF1';

interface AdminApplicationEvaluationContainerProps {
  applicationId: number;
}

export const AdminApplicationEvaluationContainer = ({
  applicationId,
}: AdminApplicationEvaluationContainerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const evaluator =
    (searchParams.get('evaluator') as EvaluatorType) ?? DEFAULT_EVALUATOR;

  const evaluatorRef = useRef<EvaluatorType>(evaluator);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState<string | null>(null);
  const debouncedDraft = useDebounce(draft, 500);

  const {mutate} = usePostAdminApplicationEvaluation(applicationId);

  const {data: evaluation} = useAdminApplicationEvaluation({
    applicationId,
    evaluatorType: evaluator,
  });

  // 탭 변경 시 draft 초기화
  useEffect(() => {
    setDraft(null);
  }, [evaluator]);

  useEffect(() => {
    const reviewer = searchParams.get('evaluator');
    if (!reviewer) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('evaluator', DEFAULT_EVALUATOR);
      router.replace(`?${params.toString()}`, {scroll: false});
    }
  }, [router, searchParams]);

  useEffect(() => {
    evaluatorRef.current = evaluator;
  }, [evaluator]);

  const handleEvaluatorClick = (reviewer: EvaluatorType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('evaluator', reviewer);
    router.push(`?${params.toString()}`, {scroll: false});
  };

  const handleResizeHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const displayValue = draft ?? evaluation?.data.comment ?? '';

  useEffect(() => {
    handleResizeHeight();
  }, [displayValue]);

  useEffect(() => {
    // 아직 입력이 없거나 초기 상태면 중단
    if (draft === null || debouncedDraft === null) return;
    if (!evaluation) return;

    const serverComment = evaluation.data.comment ?? '';

    // 서버 데이터와 동일하면 API 호출 방지
    if (debouncedDraft === serverComment) return;

    mutate({
      applicationId,
      body: {
        evaluatorType: evaluator,
        comment: debouncedDraft,
      },
    });
  }, [debouncedDraft, evaluation, evaluator, applicationId, mutate]);

  return (
    <div className='flex w-full flex-col gap-2.5'>
      <div className='flex gap-5 lg:gap-10'>
        {EVALUATOR_TABS.map(({label, value}) => {
          const isActive = evaluator === value;
          return (
            <button
              key={value}
              onClick={() => handleEvaluatorClick(value)}
              className={clsx(
                'flex min-w-12.5 items-center justify-center transition-colors lg:h-10',
                'text-body-m lg:text-h5',
                isActive
                  ? 'font-bold text-neutral-800'
                  : 'font-medium text-neutral-400',
                'bg-white hover:text-neutral-600'
              )}>
              {label}
            </button>
          );
        })}
      </div>

      <textarea
        ref={textareaRef}
        value={displayValue}
        onChange={(e) => setDraft(e.target.value)}
        placeholder='면접 질문 및 서류평가에 대해 자유롭게 작성해주세요.'
        className='lg:text-h5 text-body-l min-h-35 w-full resize-none overflow-hidden rounded-[10px] border-[1.5px] border-neutral-200 bg-white p-5 outline-none placeholder:text-neutral-600'
      />
    </div>
  );
};
